import { defineStore } from 'pinia'

/**
 * Глобальный стор для самого приложения
 */
export const appStore = defineStore('app', {
   state: () => {
      return {
         test: 5
      };
   }
});
