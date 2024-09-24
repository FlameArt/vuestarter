<template lang="pug">



</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

// Иконки
import { } from '@icons/24/solid'

// Глобальное хранилище, роуты, локали
const store = storeFile(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

// Входящие данные компонента
const props = defineProps<{
  data?: any
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  data: {},
  selectedSubcription: 1
})

</script>

<style scoped lang="scss">
.minibutton {
  @apply cursor-pointer rounded-2xl border-slate-200 border-2 px-4 py-2
}

.minibutton:hover {
  @apply bg-slate-200
}
</style>


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