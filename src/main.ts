import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import router from "./router";

import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

import REST from 'flamerest';
import Core from './models/Core';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import Auth from './models/Auth';
import { settingsFile } from './settings';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
})

if (location.hostname === 'localhost') {
  // ТУТ МОЖН УКАЗАТЬ ВНЕШНИЙ REST СЕРВ для мобильных аппов или др разрабов
  REST.SERVER = 'http://localhost';
}
else {
  REST.SERVER = 'https://YOURDOMAIN.com/'
}

// Любой неавторизованный запрос перенаправляет на логин
REST.unauthorized_callback = () => {
  if (settingsFile().authRequired)
    router.push({ name: 'Auth' })
  return true;
}

// АВТОЛОГИН
if (Auth.CheckAutologin()) throw "autologin";


createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .use(VueUniversalModal, { teleportTarget: '#my-modals', modalComponent: 'CustomModal' })
  .mount('#app')

// самая быстрая загрузка до всех инициализаций (кроме стора)
Core.load(router);
