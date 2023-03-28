import { storeFile } from "@/store";
import REST from "flamerest";
import { useRouter } from "vue-router";

export default class Auth {

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