import REST, { Rows } from "flamerest";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { storeFile } from "@/store";
import Auth from "./Auth";
import Notifications from "./base/Notifications";
import { Capacitor } from "@capacitor/core";
import { App } from '@capacitor/app';
import { settingsFile } from '../settings';

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

    const store = storeFile();
    const route: RouteLocationNormalizedLoaded = router.currentRoute.value;

    store.isMobile = Capacitor.isNativePlatform();
    store.analytics.router = router;

    // Подгружаем механики мобильных приложений
    if (store.isMobile) this.RegisterMobileEvents(router);

    // Авторизуемся
    const AuthRes = await Auth.Auth()

    if (!Auth.isAuthorized()) {

      // Юзер неавторизован
      if (settingsFile().authRequired && !this.notRedirectOnAuthList.includes(router?.currentRoute?.value?.name?.toString() ?? ''))
        router.push({ name: 'Home' })

    } else {

      // Юзер авторизован
      // Load state

      // Пуш нотификации, если включены
      if (settingsFile().isRegisterPushNotifications) {

        // На новом девайсе чекаем сразу пермишены, но не запрашиваем автоматом
        if (store.platform !== 'web') {
          const perm = await Notifications.checkPermissions();
          store.IsNewDevice = perm.receive === 'prompt';
        }

        Auth.updatePushToken();

      }

    }

  }

  public static RegisterMobileEvents(router: Router) {

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

}