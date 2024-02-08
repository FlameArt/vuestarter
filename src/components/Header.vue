<template lang="pug">

.fb.w-full.relative.mt-2(style="z-index: 99999;")
  img.cursor-pointer.fill-black(src="/src/assets/logo.png" class="h-[25px] hover:opacity-50"  @click="router.push({name: 'Home'})")
  UserCircleIcon.w-4.h-4.fill-slate-400(class="hover:opacity-60")
  //img.cursor-pointer(@click="router.push({name:'MyMessages'})" :src="'/img/notification_'+props.file+'.svg'" class="hover:opacity-70").fill-slate-400.w-8.h-8
  .fc
    .text-slate-500 {{ t('language') }}
    select.ml-3(v-model='locale')
      option(value='en') English
      option(value='ru') Русский
      option(value='fr') Français
      option(value='pt') Português
      option(value='it') Italiano
      option(value='cn') 简体中文
      option(value='ko') 한국어
      option(value='ja') 日本語

.mt-8

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick, watch } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';


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

watch(locale, (newVal) => {
  localStorage.setItem('selectedLanguage', newVal)
})

</script>

<style scoped lang="scss"></style>


<i18n>
{
  "en": {
    "language": "Language",
  },  
  "ru": {
    "language": "Язык",
  },
  "ja": {
    "language": "言語",
  }
}
</i18n>