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

            // Юридическое название компании, сокращённое для удобочитаемости текста
            appName: "MyApp",

            URL: {

               // Основной сайт
               base: 'https://myapp.com',

               // Оферта
               offer: 'https://myapp.com/public_offer', //REST.SERVER,

               // Условия предоставления услуг
               terms: 'https://myapp.com/terms', //REST.SERVER,

               // страница с Политикой конфидециальности
               privacy: 'https://myapp.com/privacy', //REST.SERVER,

               // Публичная страница с ценами
               // Не является гарантированной и юридической ценой
               prices: 'https://myapp.com', //REST.SERVER,

               // Страница с ценами внутри админки пользователя
               // Является юридически настоящими ценами
               pricesInCabinet: 'https://myapp.com/', //REST.SERVER,

            },
            OrganizationName: {
               'en': 'My Org Name Inc.',
               'ru': 'My Org Name Inc.',
               'fr': 'My Org Name Inc.',
            },
            OrganizationRegistrationID: '12345',
            OrganizationRegistrationCountry: 'CountryName',
            OrganizationMailAdress: 'adress',
            BillingOrganizationsName: 'PayPal, LAVA',
            ContactEmail: 'my@email.com',
            SupportEmail: 'my@email.com',
            PayContactEmail: 'my@email.com',
            LegalContactEmail: 'my@email.com',
            DMCAContactEmail: 'my@email.com',

            // Что продукт делает
            ProductDescription: {
               'en': '',
               'ru': '',
            },
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
