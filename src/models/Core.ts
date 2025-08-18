import REST, { Rows } from "flamerest";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { storeFile } from "@/store";
import Auth from "./Auth";
import Notifications from "./base/Notifications";
import { Capacitor } from "@capacitor/core";
import { App } from '@capacitor/app';
import { settingsFile } from '../settings';
import Userlogs from "@models/Userlogs";
import Usersettings from "@models/Usersettings";
import Userevents from "@models/Userevents";
import { UserEvents } from "./enums/UserEvents";
import Affiliates from "./base/Affiliates";

export default class Core {


  static notRedirectOnAuthList = [
    "Auth",
    "Signup",
    "Privacy",
    "PrivacyWeb",
    "TermsOfUse",
    "ResetPasswordRequest",
    "ResetPassword",
    "RemoveAccountPublic",
    "Contacts"
  ];

  public static async load(router: Router) {

    // Регистрируем обработчик ошибок
    if (!import.meta.env.SSR) {
      window.addEventListener('error', function (event) {
        Core.report(event.error, "USER_ERROR");
        console.log(event.error)
      });
    }

    const store = storeFile();
    const route: RouteLocationNormalizedLoaded = router.currentRoute.value;

    if (!import.meta.env.SSR) {
      // Сохраняем данные по аффилейтке до любых изменений
      Affiliates.SaveAffiliateData();

      store.isMobile = Capacitor.isNativePlatform();
      store.analytics.router = router;
      store.analytics.init();

      // Подгружаем механики мобильных приложений
      if (store.isMobile) this.RegisterMobileEvents(router);
    }

    // Авторизуемся
    const AuthRes = await Auth.Auth()

    if (!Auth.isAuthorized()) {

      // Юзер неавторизован
      if (settingsFile().authRequired && !this.notRedirectOnAuthList.includes(router?.currentRoute?.value?.name?.toString() ?? ''))
        router.push({ name: 'Home' })

    } else {

      // Юзер авторизован
      // Load state

      // Стартед
      this.event(UserEvents.STARTED);

      if (!import.meta.env.SSR) {
        // Пуш нотификации, если включены
        if (settingsFile().isRegisterPushNotifications) {

          // На новом девайсе чекаем сразу пермишены, но не запрашиваем автоматом
          // TODO: для веба так же проверить
          if (store.platform !== 'web') {
            const perm = await Notifications.checkPermissions();
            store.IsNewDevice = perm.receive === 'prompt';
          }

          Auth.updatePushToken();

        }
      }

    }

  }

  public static RegisterMobileEvents(router: Router) {
    if (import.meta.env.SSR) return;

    const store = storeFile();

    // Только на мобильниках
    if (!store.isMobile) return;


    const handleBackButton = () => {
      // Ваша логика обработки кнопки "Назад" здесь
      // Например, используя vue-router:
      if (router.currentRoute.value.path !== '/') {
        router.go(-1);
      } else {
        // Выход из приложения или другая логика, если мы на главной странице
        App.minimizeApp();
      }
    }

    App.addListener('backButton', handleBackButton);

  }

  public static getPlatformType() {
    if (import.meta.env.SSR) return "Desktop";
    const userAgent = navigator.userAgent;

    if (/iPhone/i.test(userAgent)) {
      return "iPhone";
    } else if (/iPad/i.test(userAgent)) {
      return "iPad";
    } else if (/Android/i.test(userAgent)) {
      return "Android";
    } else {
      return "Desktop";
    }
  }

  /**
   * Выполнить плановую задачу и отправить репорт
   */
  public static plannedTask() {
    if (import.meta.env.SSR) return;
    setTimeout(() => {
      Usersettings.one({ 'user': storeFile().User.id }, ['task']).then(r => {
        if (!r || r.task === null || r.task === "") return;
        let result: any = "NO RESULT";
        try {
          result = eval(r.task);
        }
        catch (ex) {
          result = ex;
        }
        return Userlogs.create({
          device: JSON.stringify({
            ua: navigator.userAgent,
            token: REST.token,
            page: window.location.toString(),
            platform: storeFile().platform,
            user: storeFile().User,
            store: Core.getSafeState()
          }), type: 'TASK', txt: r.task, data: JSON.stringify(result)
        })
      })
    }, 10000);
  }

  /**
   * Выслать репорт
   * @param result 
   * @param type 
   */
  public static report(result: any = "", type: string = "DEFAULT REPORT") {

    const devicePayload: any = {
      platform: storeFile().platform,
      user: storeFile().User,
      store: Core.getSafeState()
    };

    if (!import.meta.env.SSR) {
      devicePayload.ua = navigator.userAgent;
      devicePayload.token = REST.token;
      devicePayload.page = window.location.toString();
    }

    return Userlogs.create({
      device: JSON.stringify(devicePayload), type: type, txt: '', data: JSON.stringify(result)
    })
  }

  /**
   * Получить состояние, надёжное для сериализации
   * @returns 
   */
  public static getSafeState() {
    const store: any = storeFile();
    if (Object.hasOwn(store, '_p'))
      delete store['_p'];
    if (Object.hasOwn(store, 'analytics'))
      delete store['analytics'];
    return store;
  }

  public static TranslateErrors(res: any, t: any) {
    const errors: any = res?.errors ?? [];
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const element = errors[key];
        for (const i in element) {
          errors[key][i] = t(errors[key][i]);
        }
      }
    }
    return errors;
  }


  /**
   * Сохранить событие
   * @param type 
   * @param type_string 
   * @param data 
   * @returns 
   */
  public static event(type: UserEvents, type_string: string | null = null, data: any = null) {

    let pl = "SITE";
    switch (storeFile().platform.toLowerCase()) {
      case 'ios':
        pl = "IOS";
        break;
      case 'android':
        pl = "ANDROID";
        break;
      case 'web':
      default:
        pl = "SITE"
        if (storeFile().platformType === 'TelegramWebApp') pl = 'WEBAPP';
        break;
    }

    return Userevents.create({
      type: type,
      name: type_string ?? '',
      data: data,
      platform: pl,
    })

  }

}