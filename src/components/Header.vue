<template>
  <div class="fb w-full relative self-center align-middle h-full mr-3" style="z-index: 99999;">
    <!-- <img class="cursor-pointer fill-black h-[25px] hover:opacity-50" src="/src/assets/logo.png" @click="router.push({name: 'Home'})"> -->
    <div class="text-3xl grow cursor-pointer" @click="goHome">{{ settingsFile().appName }}</div>
    <!-- <img class="cursor-pointer hover:opacity-70 fill-slate-400 w-8 h-8" @click="router.push({name:'MyMessages'})" :src="'/img/notification_'+props.file+'.svg'"> -->

    <!-- Balances -->
    <div class="fc ml-5 items-center" v-if="balancesString">
      <span class="font-bold text-slate-600">🎫 {{ balancesString }}</span>
    </div>

    <div class="fc">
      <!-- <div class="text-slate-500">{{ t('Язык') }}</div> -->
      <select class="ml-3" v-model='globalLocale'>
        <option value='en'>English</option>
        <option value='ru'>Русский</option>
        <!-- 
        <option value='fr'>Français</option>
        <option value='pt'>Português</option>
        <option value='it'>Italiano</option>
        <option value='cn'>简体中文</option>
        <option value='ko'>한국어</option>
        <option value='ja'>日本語</option> 
        -->
      </select>
    </div>
    <div class="fc ml-5">
      <UserCircleIcon class="mr-2 w-6 h-6 fill-slate-400 hover:opacity-60" />
      <div class="text-slate-600" v-if="Auth.isAuthorized()">{{ store.User.name }}</div>
      <div class="text-slate-600 cursor-pointer underline" v-else @click="router.push({ name: 'Auth' })">{{ t("Войти") }}
      </div>
    </div>
  </div>
  <div class="mt-8"></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from '@vue/runtime-core'; import { computed, type Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';
import Auth from '@/models/Auth';

// Иконки
import { BellIcon, UserCircleIcon } from '@icons/24/solid'
import { settingsFile } from '@/settings';


// Глобальное хранилище, роуты, локали
const store = storeFile(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

// Входящие данные компонента
const props = defineProps<{
  file?: string
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  data: {}
})

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