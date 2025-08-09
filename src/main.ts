import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'
import router from "./router";
import { createI18n } from 'vue-i18n'

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
import { storeFile } from './store';
import { vuetifyProTipTap } from 'flameresttable/src/components/editor/TextEditor'

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
})

if (location.hostname === 'testrest') {
  // ТУТ МОЖН УКАЗАТЬ ВНЕШНИЙ REST СЕРВ для мобильных аппов или др разрабов
  REST.SERVER = 'http://testrest';
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

    // Обработка режима обслуживания сервера (503 ошибка)
    REST.maintenance_callback = (errorMessage?: string) => {
      // Сохраняем сообщение об ошибке в localStorage для передачи на страницу
      if (errorMessage) {
        localStorage.setItem('maintenance_message', errorMessage);
      }
      // Перенаправляем на страницу обслуживания
      navigate('/maintenance');
    }

// АВТОЛОГИН
if (Auth.CheckAutologin()) throw "autologin";

// Создаём приложение и активируем стор
const app = createApp(App)
  .use(createPinia());

// Кастомная логика подключения плагинов
const store = storeFile();

// Выбор языка, с загрузкой сохранённого
let userLang = navigator.language.split('-')[0];
if (localStorage.getItem('selectedLanguage')) {
  userLang = localStorage.getItem('selectedLanguage') ?? 'en';
}

// Локаль
store.locale.locale = userLang;

const i18nPlugin = createI18n({
  locale: store.locale.locale,
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
});
store.locale.i18n = i18nPlugin;

// Глобально меняем локаль в плагине при изменении значения
store.$subscribe((mutation, state) => {
  i18nPlugin.global.locale.value = state.locale.locale as any;
});

// загружаем плагины
app
  .use(router)
  .use(vuetify)
  .use(i18nPlugin)
  .use(vuetifyProTipTap)
  .use(VueUniversalModal, { teleportTarget: '#my-modals', modalComponent: 'CustomModal' })

// отлавливаем все ошибки внутри компонентов
app.config.errorHandler = function (err: any, vm: any, info: string) {

  // err: сама ошибка, которая была брошена
  // vm: экземпляр Vue компонента, в котором произошла ошибка
  // info: дополнительная информация об ошибке
  if (import.meta.env.MODE === 'production') {
    console.error('Произошла ошибка:', err, info);
    Core.report({ message: err.message, stack: err.stack, info: info }, "COMPONENT_ERROR")
  } else {
    // empty
  }

};

// После всех настроек монтируем
app.mount('#app')


// самая быстрая загрузка до всех инициализаций (кроме стора)
Core.load(router);
