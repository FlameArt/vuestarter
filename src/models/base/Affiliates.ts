export default class Affiliates {

   // TODO: при реге отдавать

   public static SaveAffiliateData() {

      // Проверяем, есть ли уже login_aff_hash в localStorage
      if (localStorage.getItem('login_aff_hash')) {
         return; // Выходим, если параметр уже существует
      }

      // Собираем данные
      const query = new URLSearchParams(window.location.search);
      const now = new Date();
      const mysqlDate = now.toISOString().slice(0, 19).replace('T', ' ');

      const data = {
         action: 0,
         uri: location.toString(),
         useragent: navigator.userAgent,
         lang: navigator.language,
         referer: document.referrer,
         utm_term: query.get('utm_term'),
         utm_source: query.get('utm_source'),
         utm_medium: query.get('utm_medium'),
         utm_campaign: query.get('utm_campaign'),
         utm_content: query.get('utm_content'),
         clickID: query.get('cid'),
         clickDate: mysqlDate // Добавляем дату в UTC
      };

      // Сериализуем в JSON и кодируем в base64
      const jsonString = JSON.stringify(data);
      const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

      // Сохраняем в localStorage
      localStorage.setItem('login_aff_hash', base64Data);

   }

   /**
    * Получаем первично записанные данные для регистрации
    * Так мы гарантируем, что только инфа первого клика будет записана
    * @returns 
    */
   public static GetAffiliateData() {
      // 1. Получаем закодированные данные из localStorage
      const base64Data = localStorage.getItem('login_aff_hash');
      if (!base64Data) return null; // Если нет данных — возвращаем null

      try {
         // 2. Декодируем из base64 в строку (с обработкой Unicode)
         const decodedJsonString = decodeURIComponent(escape(atob(base64Data)));

         // 3. Парсим JSON и возвращаем объект
         return JSON.parse(decodedJsonString);
      } catch (error) {
         console.error('Failed to decode affiliate data:', error);
         return null; // В случае ошибки парсинга возвращаем null
      }
   }

}


export enum StatActions {

   /**
    * Прогрузка сайта
    */
   "site_load" = 1,

   /**
    * Регистрация
    */
   "registration" = 2,

   /**
    * Оплата
    */
   "conversion" = 3,

   /**
    * Авторизация
    */
   "auth" = 4
}