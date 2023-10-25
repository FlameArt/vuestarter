import router from "@/router";
import { storeFile } from "@/store";
import REST, { Authorized } from "flamerest";
import { useRouter } from "vue-router";
import Notifications from './base/Notifications';
import Core from "./Core";


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

    console.log('pushinfo:' + pushInfo);

    // Автоматическая и ручная авторизация
    let RESTResult: Promise<Authorized>;
    if (login === undefined || password === undefined || login === null) {
      RESTResult = REST.auth();
    }
    else
      RESTResult = REST.auth(login, password, pushInfo);

    // Шлём авторизацию на ендпоин
    let tUser: Authorized | null = null;

    try {
      tUser = await RESTResult;
    }
    catch (ex) {
      /* empty */
    }

    if (tUser === null) {
      const thisLocation = location.protocol + "//" + location.host + "/signup";
      if (location.pathname !== "/signup" && location.pathname !== "/in" && location.pathname !== "/welcome" && location.pathname !== "/privacy" && location.pathname !== "/privacy-web" && location.pathname !== "/terms" && location.pathname !== "/removeaccount" && location.pathname !== "/contacts")
        document.location = thisLocation;
      // @ts-expect-error oks
      return;
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
    if (storeFile().platform === 'web') return;
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