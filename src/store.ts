import { defineStore } from 'pinia'
import { Authorized } from 'flamerest'

export const storeFile = defineStore('store', {
  state: () => {
    return { 
      User: {
        id: 0,
        role: 'Guest',
        name: 'name',
        lang: '',
        country: '',
        isLoaded: false
      },      
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    authUser(tUser: Authorized) {
      this.User = Object.assign(this.User, tUser.User);
    },
  },
})
