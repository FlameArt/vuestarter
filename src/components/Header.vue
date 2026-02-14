<template>

  <div class="fb w-full relative self-center align-middle h-full" style="z-index: 99999; height: 100%;">
    <!-- Левая часть: мобильная иконка меню или кнопка развернуть -->
    <div class="d-flex align-center">
      <!-- Мобильная иконка меню -->
      <v-app-bar-nav-icon v-if="state.isAuthNeeded() && store.isAuthorized && $vuetify.display.smAndDown"
        variant="text" @click.stop="emit('update:drawer', !props.drawer)"></v-app-bar-nav-icon>

      <!-- Кнопка развернуть навигацию (только на десктопе когда свёрнуто) -->
      <v-btn v-if="state.isAuthNeeded() && store.isAuthorized && $vuetify.display.mdAndUp && !props.drawer" icon
        size="small" variant="text" @click="emit('update:drawer', true)">
        <!-- ИСПРАВЛЕНО: Убрано дублирование mdi: -->
        <v-icon icon="mdi:account"></v-icon>
      </v-btn>

      <!-- Название приложения (скрыто на мобильных) -->
      <div v-if="$vuetify.display.mdAndUp" class="text-lg font-weight-bold text-grey-darken-1 text-uppercase ml-3"
        style="white-space: nowrap;">
        {{ settingsFile().appName }}
      </div>
    </div>
    <div class="fc">
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text">
            <!-- ИСПРАВЛЕНО: Правильный формат иконки для Vuetify 3 -->
            <v-icon :icon="mdiWeb" size="16"></v-icon>
            <span class="ml-2 d-none d-sm-inline">{{ currentLanguageName }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="lang in state.availableLocales" :key="lang.code" @click="globalLocale = lang.code"
            :active="globalLocale === lang.code">
            <v-list-item-title>{{ lang.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Balances - перемещены правее -->
    <div class="fc ml-5 items-center" v-if="balancesString">
      <span class="font-bold text-slate-600">🎫 {{ balancesString }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from 'vue'; import { computed, type Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';


// Иконки
import { BellIcon, UserCircleIcon } from '@icons/24/solid'
import { settingsFile } from '@/settings';
import { mdiAccount, mdiWeb } from '@mdi/js'


// Глобальное хранилище, роуты, локали
const store = storeFile(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

// Входящие данные компонента
const props = defineProps<{
  file?: string,
  drawer?: boolean
}>()
const emit = defineEmits(['test', 'update:drawer'])

// Локальное состояние компонента
const state = reactive({
  isAuthNeeded: () => store.User.isLoaded || !settingsFile().authRequired,
  isAuthorized: () => settingsFile().authRequired && store.isAuthorized || !settingsFile().authRequired,
  availableLocales: [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
  ]
})

const currentLanguageName = computed(() => {
  const current = state.availableLocales.find(l => l.code === globalLocale.value);
  return current ? current.name : state.availableLocales[0].name;
});

const balancesString = computed(() => {
  if (store.User && Array.isArray(store.User.balance_all)) {
    if (store.User.balance_all.length === 0) {
      return '';
    }
    return store.User.balance_all
      .map(item => `${item.name}: ${Math.round(item.value || 0)}`)
      .join(', ');
  }
  return '';
});

// Меняем локаль по селектору
const globalLocale = computed({
  get() {
    return store.locale.i18n.global.locale;
  },
  set(value: any) {
    store.locale.locale = value;
    localStorage.setItem('selectedLanguage', value)
    //locale.value = value; // Обновляем локаль i18n
    store.locale.i18n.global.locale = value;
  }
});

</script>

<style scoped lang="scss"></style>


<i18n>
{
  "en": {
    "Язык": "Language",
    "Войти": "Sign in",
  },  
  "ru": {
    "Язык": "Язык",
    "Войти": "Войти",
  },
  "ja": {
    "Язык": "言語",
    "Войти": "ログイン",
  }
}
</i18n>