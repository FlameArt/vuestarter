import { storeFile } from "@/store";
import { Router } from "vue-router";

export default class Analytics {

   // Код отслеживания Google
   public googleID: any = null;

   // Код отслеживания Yandex
   public yandexID: any = null;

   // ссылка на роутер
   public router: any;

   public init() {
      if (this.yandexID !== null) this.yandex_init();
      if (this.googleID !== null) this.google_init();
   }

   public yandex_init() {

      // основной код
      ((m, e, t, r, i, k, a) => {
         // @ts-expect-error oks
         // eslint-disable-next-line prefer-rest-params
         m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
         // @ts-expect-error oks
         m[i].l = 1 * new Date();
         for (let j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
         // @ts-expect-error oks
         k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
         if (k)
            (k as any).onload = () => {
               // Инициализация
               // @ts-expect-error oks
               ym(this.yandexID, "init", {
                  defer: true,
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true
               });
            }
      })
         // eslint-disable-next-line no-unexpected-multiline
         (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   }

   public google_init() {
      const el = document.createElement("script");
      el.async = true;
      el.src = "https://www.googletagmanager.com/gtag/js?id=" + this.googleID;
      el.onload = () => {
         (window as any).dataLayer = ((window as any).dataLayer) || [];
         // @ts-expect-error any okay
         // eslint-disable-next-line prefer-rest-params
         function gtag() { dataLayer.push(arguments); }
         // @ts-expect-error any okay
         gtag('js', new Date());
         // @ts-expect-error any okay
         gtag('config', this.googleID);
      }
      document.head.appendChild(el);
   }

   public static track(options: { action?: string, category?: string, label?: string, value?: string } = {}) {
      const store = storeFile();
      // @ts-expect-error oks
      if (store.analytics.yandexID !== null && typeof ym !== 'undefined') {
         // @ts-expect-error oks
         ym(store.analytics.yandexID, 'hit', router.currentRoute.value, options);
      }
      // @ts-expect-error oks
      if (store.analytics.googleID !== null && typeof gtag === 'function') {
         // @ts-expect-error oks
         gtag('event', options.action ?? 'default', {
            'event_category': options.category ?? 'all',
            'event_label': options.label ?? 'default',
            'value': options.value
         });
      }
   }


}