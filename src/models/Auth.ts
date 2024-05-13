import router from "@/router";
import { storeFile } from "@/store";
import REST, { Authorized } from "flamerest";
import { useRouter } from "vue-router";
import Notifications from './base/Notifications';
import Core from "./Core";
import { settingsFile } from "@/settings";


export default class Auth {

  public static async Auth(login?: string, password?: string): Promise<AuthResult> {

    const store = storeFile();

    // Прогружаем токен
    const token = localStorage.getItem("jwttoken");
    if (token !== null && token !== undefined)
      REST.token = token;

    // пуш-токен при каждом входе добавляем новый

    //const pushInfo = store.isRegisterPushNotifications ? await Notifications.getPushInfo() : { 'n': true };
    const pushInfo = null;

    // Автоматическая и ручная авторизация
    let RESTResult: Promise<Authorized>;
    if (login === undefined || password === undefined || login === null) {
      RESTResult = REST.auth();
    }
    else
      RESTResult = REST.auth(login, password, pushInfo);

    // Шлём авторизацию на ендпоин
    let tUser: Authorized | null = null;
    let tgUser: any | null = null;

    // Сперва авторизуем тг 
    // если его нет, мгновенно возвращается ответ
    // Если авторизация успешно, он сохранил токен, который будет запрошен далее
    try {
      tgUser = await this.Auth_TelegramWebApp();
    }
    catch (ex) {
      /* empty */
    }

    try {
      tUser = await RESTResult;
    }
    catch (ex) {
      /* empty */
    }

    if (tUser === null) {
      const thisLocation = location.protocol + "//" + location.host + "/signup";
      if (settingsFile().authRequired)
        if (location.pathname !== "/signup" && location.pathname !== "/in" && location.pathname !== "/welcome" && location.pathname !== "/privacy" && location.pathname !== "/privacy-web" && location.pathname !== "/terms" && location.pathname !== "/removeaccount" && location.pathname !== "/contacts")
          document.location = thisLocation;
      // @ts-expect-error oks
      return;
    }

    // Недействительный токен
    if ((tUser as any).status === 401) {
      localStorage.removeItem("jwttoken");
      return {
        success: false
      };
    }

    // Проверка успешности и возврат данных
    if (tUser.isAuthorized) {

      Auth.AuthUser(tUser);

      return {
        success: true
      };

    } else {

      // ошибки авторизации
      if (tUser.errors) {

        store.User.isLoaded = false;

        return {
          success: false,
          loginErr: (
            tUser.errors["email"] ??
            tUser.errors["login"] ??
            []
          ).join(". "),
          passwErr: (tUser.errors["password"] ?? []).join(". ")
        };
      }

      else {

        // Ошибок нет, просто гость
        Auth.AuthUser(tUser);

        return {
          success: true
        };

      }
    }


  }
  public static AuthUser(tUser: Authorized) {

    const store = storeFile();

    store.User = Object.assign(store.User, tUser.User);
    localStorage.setItem("jwttoken", tUser.token);
    REST.token = tUser.token;

    store.User.isLoaded = true;
    Auth.SaveToken(tUser.token);

  }

  // ждём авторизации
  public static WaitAuth(): Promise<boolean> {
    const store = storeFile();

    // мгновенная отдача состояния если авторизованность уже есть
    if (store.User.isLoaded === true) return new Promise((r) => r(true));

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (store.User.isLoaded === true) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100)
    })

  }

  public static isAuthorized(): boolean {
    const store = storeFile();
    return store.User.id !== 0;
  }


  public static async Signup(email = "", passw = "", name = ""): Promise<SignupResult> {

    const store = storeFile();

    // Установка токена нотификаций для мобильных аппов
    //const pushInfo = store.isRegisterPushNotifications ? await Notifications.getPushInfo() : null;
    const pushInfo = null;


    return REST.signup(email, null, passw, name, pushInfo).then((res) => {
      if (res.isAuthorized === true) {
        Auth.AuthUser(res);
        //router.push({ name: "Home" });
        return {
          success: true
        };
      }
      if (res.errors) {
        return {
          success: false,
          errors: res.errors
        }
      }
      return {
        success: false,
        errors: ["Unknown Signup error"]
      }
    });

  }

  public static SaveToken(token: any) {
    if (typeof token === 'string') {
      REST.token = token;
      localStorage.setItem("jwttoken", token);
    }
  }


  public static async Logout(router: any) {
    const token = localStorage.getItem("jwttoken");
    if (token !== null)
      localStorage.removeItem("jwttoken");
    await REST.logout();
    const store = storeFile();
    store.User.id = 0;
    router.push('/');
    //document.location = REST.SERVER;
  }



  public static async SignupSuccess() {

    const store = storeFile();

  }

  public static GOAutoLoginOnSite() {
    const link = REST.SERVER + '/al?a=' + REST.token;
    window.location.href = link;
  }

  public static CheckAutologin() {
    const urlParams = new URLSearchParams(location.search);
    if (window.location.pathname === '/al' && urlParams.has("a")) {
      this.SaveToken(urlParams.get('a'));
      window.location.replace(REST.SERVER);
      return true;
    }
    return false;
  }

  public static ResetPasswordRequest(email: string) {
    return REST.ResetPasswordRequest(email);
  }

  public static ResetPasswordTokenCheck(token: string) {
    return REST.ResetPasswordTokenCheck(token);
  }

  public static ResetPasswordSaveNewPassword(token: string, newPassw: string) {
    return REST.ResetPasswordSaveNewPassword(token, newPassw);
  }

  /**
   * Удалить аккаунт
   * @param router 
   */
  public static async RemoveAccount(router: any) {

    if (prompt("Для удаления аккаунта напишите слово УДАЛИТЬ")?.trim() !== 'УДАЛИТЬ') {
      alert("Не написано \"удалить\", отмена")
      return;
    }

    const result: any = await REST.request(REST.SERVER + "/auth/removeaccount", {}, 'POST', 'json', true, { verifyRemove: storeFile().User.id })

    if (result.data.result !== "success") {
      alert('Не удалось удалить аккаунт: ' + result?.data.errors?.join(". "))
    }

    // Удаление успешно
    alert("Ваш аккаунт успешно удалён! Сейчас вы будете перенаправлены на главную страницу")

    // очищаем сессию и выходим
    this.Logout(router);

  }

  public static async IsNewDevice() {
    const result: any = await REST.request(REST.SERVER + "/auth/isnewdevice", { uuid: await Notifications.getDeviceUUID() }, 'POST', 'json', true)
    if (result.data.result === 'success') return result.newDevice as boolean;
    return false;
  }

  /**
   * Обновить старый токен только если разрешение было дано
   */
  public static async updatePushToken() {
    const perm = await Notifications.checkPermissions();
    if (perm.receive === 'granted') {
      this.RequestAndSavePushToken();
    }
  }

  /**
   * Запрос на создание ключа
   * @param router 
   */
  public static async RequestAndSavePushToken() {

    const isNewDevice = await this.IsNewDevice();
    //const perm = await Notifications.checkPermissions();

    if (isNewDevice === false) return;

    // Запрашиваем токен
    const pushInfo = await Notifications.getPushInfo();

    // токен не удалось получить
    if (pushInfo === null) {
      console.log("pushinfo not found: " + pushInfo)
      return;
    }


    const result: any = await REST.request(REST.SERVER + "/auth/savepushtoken", pushInfo, 'POST', 'json', true, {})

    if (result.data.result !== "success") {
      alert('Не удалось обновить настройки: ' + result?.data?.errors?.join(". "))
    }

  }

  public static Auth_TelegramWebApp() {

    const store = storeFile();

    // Тестим на телеграм, чтобы не загружать большую библиотеку всем
    if (store.platform !== 'web') return null;
    if (!this.isWebView()) return null;

    // 
    return new Promise((res, err) => {

      // грузим скрипт и проверяем
      const script: any = document.createElement("script")
      script.type = "text/javascript";

      script.onload = async () => {

        const tgUser = (window as any).Telegram?.WebApp?.initDataUnsafe?.user

        // не удалось подгрузить данные юзера или это не телеграм
        if (typeof tgUser !== 'object') res(null);

        // Проводим авторегистрацию

        // К существующему юзеру просто привязка акка
        if (store.User.id !== 0) {
          res(this.Auth_telegram());
        }

      };

      // Прогружаем
      script.src = "https://telegram.org/js/telegram-web-app.js";
      document.getElementsByTagName("head")[0].appendChild(script);
    })
  }

  static isWebView() {
    const ua = navigator.userAgent;
    // Веб тестируем на WebView, чтобы не грузить всем библиотеку
    const webviewRegExp = new RegExp('(' + [
      // if it says it's a webview, let's go with that
      'WebView',
      // iOS webview will be the same as safari but missing "Safari"
      '(iPhone|iPod|iPad)(?!.*Safari)',
      // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
      // Android KitKat to Lollipop webview will put Version/X.X Chrome/{version}.0.0.0
      'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
      // old chrome android webview agent
      'Linux; U; Android'
    ].join('|') + ')', 'ig');

    return !!ua.match(webviewRegExp);
  }

  static async Auth_telegram() {

    const tg = (window as any).Telegram?.WebApp?.initDataUnsafe
    const tgUser = tg?.user

    const res: any = await REST.request(REST.SERVER + "/auth/tgauth", Object.assign({}, tgUser, {
      start_param: tg.start_param,
      hash: tg.hash,
      initData: (window as any).Telegram?.WebApp?.initData
    }))

    if (typeof res?.data?.token === 'string')
      Auth.SaveToken(res.data.token);

  }

}

export interface AuthResult {
  success?: boolean,
  loginErr?: string,
  passwErr?: string
}
export interface SignupResult {
  success?: boolean,
  errors?: { [key: string]: any },
}