import { storeFile } from "@/store";
import Userorders from "@models/Userorders";
import REST, { Rows } from "flamerest";
import { useRoute, useRouter } from 'vue-router';

export default class Pays {

   public static async GoToPay(subscriptionID: any, subscriptionItemID: any, isTrial: boolean = false) {

      const link: PayLinkResult = await REST.request(REST.SERVER + '/' + 'pay/getlink', {
         subscription: subscriptionID,
         paymethod: null,
         paysystem: null,
         trialrequest: isTrial,
         data: {}
      }, 'POST', 'json') as any;


      if (link.data.status !== 'success') {
         window.alert('Неизвестная ошибка: ' + link.data.message)
      }

      window.open(link.data.link);

      // Ожидаем результата оплаты по ссылке
      const sRedirect = location.protocol + "//" + location.host + "/meditation/" + subscriptionItemID;
      const eRedirect = location.protocol + "//" + location.host + "/";
      await this.WaitPayResult(link.data.orderID, sRedirect, eRedirect);

   }

   public static async WaitPayResult(orderID: number, successRedirect: string, errorRedirect: string) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
         await this.delay(1000);
         const res = await Userorders.one(orderID);
         if (res === null) {
            alert('Ошибка платежа');
            return false;
         }
         if (res.status === 'NEW') continue;
         if (res.status === 'PAYED' || res.status === 'COMPLETED') {
            // тут можно вставить красивую СПАСИБО ЗА ПОКУПКУ ЧЕРЕЗ 3 СЕК БУДЕТЕ ПЕРЕНАПРАВЛЕНЫ
            await storeFile().update();
            document.location = successRedirect;
         }
         else {
            await storeFile().update();
            document.location = errorRedirect
         }
         return;
      }
   }

   public static delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }


   public static async TrialRequest(medit: any, router: any) {

      const link: PayLinkResult = await REST.request(REST.SERVER + '/' + 'pay/trialrequest', {
         subscription: medit.sub?.id,
      }, 'POST') as any;


      if (link.data.status === 'success') {
         await storeFile().update();
         router.push({ name: 'Meditation', params: { id: medit.id } })
      }

   }

}

interface PayLink {
   paysystem: 'Freekassa' | 'Prodamus',
   paymethod?: string,
   data: object,
}

interface PayLinkResult {
   data: {
      status: string,
      link: string,
      message: string,
      orderID: number,
   }
}