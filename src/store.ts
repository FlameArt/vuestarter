import { defineStore } from 'pinia'
import { Authorized } from 'flamerest'
import Auth from './models/Auth'

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
    }
  },

  // Общие экшены
  actions: {

  },
})
