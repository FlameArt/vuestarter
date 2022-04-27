import { defineStore } from 'pinia'

export const storeFile = defineStore('store', {
  state: () => {
    return { 
      User: {
        id: 0,
        role: 'Guest',
        name: 'name',
        lang: '',
        country: ''
      },      
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
