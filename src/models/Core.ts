import REST, { Rows } from "flamerest";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { storeFile } from "@/store";
import Auth from "./Auth";
import Notifications from "./base/Notifications";
import { Capacitor } from "@capacitor/core";

export default class Core {


  static notRedirectOnAuthList = [
    "Auth",
    "Signup",
    "ResetPasswordRequest",
    "ResetPassword",
  ];

  public static async load(router: Router) {

    const store = storeFile();
    const route: RouteLocationNormalizedLoaded = router.currentRoute.value;

    store.isMobile = Capacitor.isNativePlatform();

    // Авторизуемся
    const AuthRes = await Auth.Auth()

    if (store.User.id === 0) {

      // Юзер неавторизован

    } else {

      // Юзер авторизован
      // Load state

    }

  }

}