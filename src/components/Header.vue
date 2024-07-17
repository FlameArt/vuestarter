<template lang="pug">

.fb.w-full.relative.mt-2(style="z-index: 99999;")
  //img.cursor-pointer.fill-black(src="/src/assets/logo.png" class="h-[25px] hover:opacity-50"  @click="router.push({name: 'Home'})")
  .text-3xl.flex-grow SkyPoster
  //img.cursor-pointer(@click="router.push({name:'MyMessages'})" :src="'/img/notification_'+props.file+'.svg'" class="hover:opacity-70").fill-slate-400.w-8.h-8
  | {{ t("Войти") }} 
  .fc
    //.text-slate-500 {{ t('Язык') }}
    select.ml-3(v-model='globalLocale')
      option(value='en') English
      option(value='ru') Русский
      option(value='fr') Français
      option(value='pt') Português
      option(value='it') Italiano
      option(value='cn') 简体中文
      option(value='ko') 한국어
      option(value='ja') 日本語
  .fc.ml-5
    UserCircleIcon.mr-2.w-6.h-6.fill-slate-400(class="hover:opacity-60")
    .text-slate-600(v-if="Auth.isAuthorized()") {{ store.User.name }}
    .text-slate-600.cursor-pointer.underline(v-else="Auth.isAuthorized()" @click="router.push({name: 'Auth'})") {{ t("Войти") }}

.mt-8

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from '@vue/runtime-core'; import { computed, type Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';
import Auth from '@/models/Auth';


// Иконки
import { BellIcon, UserCircleIcon } from '@icons/24/solid'

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
    return store.locale.i18n.global.locale.value;
  },
  set(value: any) {
    store.locale.locale = value;
    localStorage.setItem('selectedLanguage', value)
    //locale.value = value; // Обновляем локаль i18n
    store.locale.i18n.global.locale.value = value;
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