import { defineStore } from 'pinia'
import REST, { Authorized } from 'flamerest'

/**
 * Настройки сайта
 */
export const settingsFile = defineStore('settings', {
   state: () => {
      return {

         appName: 'My App',
         appID: 'com.app.id',
         appURL: () => REST.SERVER,

         /**
          * Информация для оферт
          */
         legal: {
            OrganizationName: 'My Organisation',
            ContactEmail: 'my@email.com'
         },


         /**
          * Обязательная ли регистрация для просмотра контента
          */
         authRequired: false,

         /**
          * Нужны ли пуш нотификации
          */
         isRegisterPushNotifications: false,


         /**
          * Ключ для пушей на веб-устройства 
          */
         webNotificationsServerVAPIDKey: '',

      }
   }
});
