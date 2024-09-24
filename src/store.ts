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
        email: '',
        license_key: '',
        lang: '',
        country: '',
        avatar: '',
        balance: 0,
        balance_all: {} as { [key: string]: string },
        isLoaded: false
      },

      /**
       * Нативное приложение или web
       */
      isMobile: Capacitor.isNativePlatform(),
      platform: Capacitor.getPlatform() as 'android' | 'ios' | 'web',
      platformType: Core.getPlatformType() as "iPhone" | "iPad" | "Android" | "Desktop" | "TelegramWebApp",
      IsNewDevice: false,

      /**
       * Модуль аналитики
       */
      analytics: new Analytics,

      notifications: {
        download: {
          status: 'no' as 'no' | 'downloaded' | 'process'
        }
      },

      /**
       * Настройки локали
       */
      locale: {
        i18n: null as any,
        locale: 'en'
      },

      /**
       * Оплаты
       */
      pays: {
        /**
         * Ожидание создания ссылки
         * Значение: ID платёжной системы
         */
        WaitLink: -1,
      }

    }

  },

  // Общие экшены
  actions: {
    async update() {
      // Обновление состояния
    }
  },
})
