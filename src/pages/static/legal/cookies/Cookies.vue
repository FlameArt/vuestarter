<template lang="pug">
.fc.text-left
  div(v-if="store.locale.locale === 'ru'")
    TermsRU
  div(v-else)
    TermsEN
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

// Иконки
import { } from '@icons/24/solid'

import CookiesEN from './CookiesEN.vue';
import CookiesRU from './CookiesRU.vue';

// Глобальное хранилище, роуты, локали
const store = storeFile(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

// Входящие данные компонента
const props = defineProps<{
  data?: any
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  data: {}
})

</script>

<style scoped lang="scss"></style>


<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },  
  "ru": {
    "language": "Язык",
    "hello": "Привет"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>