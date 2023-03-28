import REST, { Rows } from "flamerest";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { storeFile } from "@/store";

export default class Core {


  static notRedirectOnAuthList = [
    "Auth",
    "Signup",
    "ResetPasswordRequest",
    "ResetPassword",
  ];

  public static async load(router: Router) {

    // Прогружаем токен
    const token = localStorage.getItem("jwttoken");
    if (token !== null && token !== undefined)
      REST.token = token;

    // Перенаправляем в зависимости от роута
    const store = storeFile();
    let route: RouteLocationNormalizedLoaded;

    REST.auth().then(async (res) => {
      store.authUser(res);
      store.User.isLoaded = true;
      route = router.currentRoute.value;

      if (res.isAuthorized === false) {

        // Если юзер неавторизован, 
        // мы уже создали пустой проект
        // TODO: теперь можем разве что прогрузить последний из браузера


      } else {

        // Load state


      }
    });

  }

  public static loadProjectFromLocalstorage() {

    /*
    const lastProject = localStorage.getItem("project");
    if (lastProject !== null) {
      store.site.load(JSON.parse(lastProject));
      store.screens = store.site.data;
    }
*/

  }

}