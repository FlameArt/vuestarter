import { defineStore } from 'pinia'
import REST, { Authorized } from 'flamerest'
import Auth from './models/Auth'
import { Capacitor } from '@capacitor/core'
import Analytics from './models/base/Analytics'

export const storeFile = defineStore('store', {
  state: () => {
    return {
      User: {
        id: 0,
        role: 'Guest',
        name: 'name',
        lang: '',
        country: '',
        avatar: '',
        isLoaded: false
      },

      /**
       * Нативное приложение или web
       */
      isMobile: Capacitor.isNativePlatform(),
      platform: Capacitor.getPlatform(),
      IsNewDevice: false,

      /**
       * Модуль аналитики
       */
      analytics: new Analytics,

    }

  },

  // Общие экшены
  actions: {
    async update() {
      // Обновление состояния
    }
  },
})
