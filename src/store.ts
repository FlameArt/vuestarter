import { defineStore } from 'pinia'
import REST, { Authorized } from 'flamerest'
import Auth from './models/Auth'
import { Capacitor } from '@capacitor/core'
import Analytics from './models/base/Analytics'
import Core from './models/Core';

export const storeFile = defineStore('store', {
  state: () => {
    return {
      User: {
        id: 0,
        role: 'Guest',
        name: 'name',
        user_hash: '',
        lang: '',
        country: '',
        avatar: '',
        isLoaded: false
      },

      /**
       * Нативное приложение или web
       */
      isMobile: Capacitor.isNativePlatform(),
      platform: Capacitor.getPlatform() as 'android' | 'ios' | 'web',
      platformType: Core.getPlatformType(),
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
