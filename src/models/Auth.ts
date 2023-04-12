import router from "@/router";
import { storeFile } from "@/store";
import REST, { Authorized } from "flamerest";
import { useRouter } from "vue-router";
import Notifications from "./base/Notifications";

export default class Auth {

  public static async Auth(login?: string, password?: string): Promise<AuthResult> {

    const store = storeFile();

    // Прогружаем токен
    const token = localStorage.getItem("jwttoken");
    if (token !== null && token !== undefined)
      REST.token = token;

    // Автоматическая и ручная авторизация
    let RESTResult: Promise<Authorized>;
    if (login === undefined || password === undefined || login === null) {
      RESTResult = REST.auth();
    }
    else
      RESTResult = REST.auth(login, password)

    // Шлём авторизацию на ендпоин
    const tUser = await RESTResult;

    // Проверка успешности и возврат данных
    if (tUser.isAuthorized) {

      Auth.AuthUser(tUser);

      router.push({ name: "Home" });

      return {
        success: true
      };

    } else {
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
    }

    throw "Unknown auth error"

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
    REST.pushNotificationToken = await Notifications.register();

    return REST.signup(email, null, passw, name, REST.pushNotificationToken).then((res) => {
      if (res.isAuthorized === true) {
        Auth.AuthUser(res);
        router.push({ name: "Home" });
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


  public static async Logout() {
    const store = storeFile();
    const token = localStorage.getItem("jwttoken");
    const router = useRouter();
    if (token !== null)
      localStorage.removeItem("jwttoken");
    await REST.logout();
    router.push({ name: 'Home' })
  }



  public static async SignupSuccess() {

    const store = storeFile();

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