import { storeFile } from "@/store";
import { Router } from "vue-router";

export default class Analytics {

   // Код отслеживания Google
   public googleID: any = null;

   // Код отслеживания Yandex
   public yandexID: any = null;

   // ссылка на роутер
   public router: any;

   public yandex_init() {

      // основной код
      (function (m, e, t, r, i, k, a) {
         // @ts-expect-error oks
         // eslint-disable-next-line prefer-rest-params
         m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
         // @ts-expect-error oks
         m[i].l = 1 * new Date();
         for (let j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
         // @ts-expect-error oks
         k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
      })
         // eslint-disable-next-line no-unexpected-multiline
         (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      // Инициализация
      // @ts-expect-error oks
      ym(this.yandexID, "init", {
         defer: true,
         clickmap: true,
         trackLinks: true,
         accurateTrackBounce: true
      });

   }

   public static track(options = {}) {
      const store = storeFile();
      // @ts-expect-error oks
      if (store.analytics.yandexID !== null && typeof ym !== 'undefined') {
         // @ts-expect-error oks
         ym(store.analytics.yandexID, 'hit', router.currentRoute.value, options);
      }
   }

}