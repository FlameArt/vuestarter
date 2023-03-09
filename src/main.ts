import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import router from "./router";

import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

import REST from 'flamerest';

if (location.hostname === 'localhost') {
  // ТУТ МОЖН УКАЗАТЬ ВНЕШНИЙ REST СЕРВ для мобильных аппов или др разрабов
  REST.SERVER = 'http://localhost';
}



createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueUniversalModal, { teleportTarget: '#my-modals', modalComponent: 'CustomModal' })
  .mount('#app')
