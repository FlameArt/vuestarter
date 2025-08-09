import { storeFile } from "@/store";
import Userorders from "@models/Userorders";
import REST, { Rows } from "flamerest";
import { useRoute, useRouter } from 'vue-router';

export default class Pays {

   public static async GoToPay(requestInfo: PayCreateOrderRequest, paysystemID = -1): Promise<number | void> {

      const request = {
         subscription: requestInfo.subscription,
         paymethod: requestInfo.paymethod,
         paysystem: requestInfo.paysystem,
         total: requestInfo.total,
         trialrequest: requestInfo.trialrequest ?? false,
         data: requestInfo.data ?? null,
         email: requestInfo.email ?? null,
         phone: requestInfo.phone ?? null,
         currency: requestInfo.currency ?? "USD"
      }

      // индикатор что будем ждать ссылки на оплату
      storeFile().pays.WaitLink = paysystemID;

      // Ожидаем ссылки оплаты [может быть до минуты]
      const link: PayLinkResult = await REST.request(REST.SERVER + '/' + 'pay/getlink', request, 'POST', 'json') as any;

      // снимаем индикацию
      storeFile().pays.WaitLink = -1;


      if (link.data.status !== 'success') {
         window.alert('Неизвестная ошибка: ' + link.data.message)
         return;
      }

      // Если запрошен режим "без ссылки", то просто возвращаем ID заказа
      if (requestInfo.linkless) {
         return link.data.orderID;
      }

      // Для тестовой системы ссылка будет локальной
      if (request.paysystem === 'TestPaymentSystem') {
         const newUrl = new URL(link.data.link);
         newUrl.protocol = "http";
         newUrl.hostname = location.hostname;
         link.data.link = newUrl.toString();
      }

      // открываем окно оплаты (метод подходит под все браузеры)
      setTimeout(async () => {
         const windowReference = window.open("about:blank", "_blank")
         if (windowReference) {
            windowReference.location = link.data.link

            // Ожидаем результата оплаты по ссылке
            //const sRedirect = location.protocol + "//" + location.host + "/meditation/" + subscriptionItemID;
            //const eRedirect = location.protocol + "//" + location.host + "/";
            const sRedirect = requestInfo.successRedirectLink ?? null;
            const eRedirect = requestInfo.failRedirectLink ?? null;
            await this.WaitPayResult(windowReference, link.data.orderID, sRedirect, eRedirect);

         }
      })

   }

   public static WaitPayResult(openedWindow: Window, orderID: number, successRedirect: string | null, errorRedirect: string | null) {

      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {

         const timer = setInterval(async () => {

            if (openedWindow.closed === false) return;

            clearInterval(timer);

            const res = await Userorders.one(orderID);
            if (res === null) {
               alert('Ошибка платежа');
               reject();
               return;
            }
            if (res.data?.status === 'NEW') return;
            if (res.status === 'PAYED' || res.status === 'COMPLETED') {
               // тут можно вставить красивую СПАСИБО ЗА ПОКУПКУ ЧЕРЕЗ 3 СЕК БУДЕТЕ ПЕРЕНАПРАВЛЕНЫ
               await storeFile().update();
               if (successRedirect !== null)
                  document.location = successRedirect;
            }
            else {
               await storeFile().update();
               if (errorRedirect !== null)
                  document.location = errorRedirect
            }

            resolve(true);
            return;

         }, 300);

      })
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

   public static async createPayPalOrder(requestInfo: PayCreateOrderRequest): Promise<string | null> {
      try {
         // Делаем запрос на бэкенд для создания заказа в системе PayPal
         const response: any = await REST.request(REST.SERVER + '/pay/create-paypal-order', requestInfo, 'POST');

         if (response && response.ok && response.data && response.data.id) {
            // Возвращаем ID заказа, полученный от PayPal
            return response.data.id;
         } else {
            console.error("Не удалось создать заказ PayPal:", response);
            // Используем alert, так как это принято в этом файле
            window.alert('Ошибка при создании заказа PayPal: ' + (response?.message || 'Неизвестная ошибка'));
            return null;
         }
      } catch (error) {
         console.error("Исключение при создании заказа PayPal:", error);
         window.alert('Произошла критическая ошибка при создании заказа PayPal.');
         return null;
      }
   }

   /**
    * Обновить балансы пользователя и сохранить их в store
    */
   public static async updateBalances() {
      try {
         const response: any = await REST.request(REST.SERVER + '/auth/balances', {}, 'GET');

         if (response && response.data && Array.isArray(response.data)) {
            const store = storeFile();
            const newBalancesFromAPI = response.data;
            const existingBalances = store.User.balance_all;
            const newKeys = new Set(newBalancesFromAPI.map((b: any) => b.name));

            // Обновляем существующие или добавляем новые
            for (const item of newBalancesFromAPI) {
               if (existingBalances[item.name]) {
                  // Обновляем существующий BalanceItem для сохранения реактивности
                  existingBalances[item.name].balance_decimal = item.balance_decimal;
                  existingBalances[item.name].value = item.value;
               } else {
                  // Добавляем новый BalanceItem
                  existingBalances[item.name] = new BalanceItem(item.name, item.balance_decimal, item.value);
               }
            }

            // Удаляем старые, которых больше нет
            for (const key in existingBalances) {
               if (!newKeys.has(key)) {
                  delete existingBalances[key];
               }
            }
         } else {
            console.error("Не удалось обновить балансы или формат данных неверен:", response);
         }
      } catch (error) {
         console.error("Исключение при обновлении балансов:", error);
      }
   }

}

export class BalanceItem {
   name: string;
   balance_decimal: string;
   value: number;

   constructor(name: string, balance_decimal: string, value: number) {
      this.name = name;
      this.balance_decimal = balance_decimal;
      this.value = value;
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

interface PayCreateOrderRequest {

   subscription: number,
   paymethod: string,
   paysystem: 'TestPaymentSystem' | 'PayPal' | 'LAVA' | 'Freekassa' | 'Cryptomus' | 'Prodamus',
   total: number,

   trialrequest?: boolean,
   data?: object,
   email?: string,
   phone?: string,

   currency?: string,

   successRedirectLink?: string,
   failRedirectLink?: string,

   linkless?: boolean, // Если true, не открывать окно, а вернуть orderID

}

