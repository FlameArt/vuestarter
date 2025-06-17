<template lang="pug">
// Табы
v-tabs.bg-slate-50.text-slate-600(
  v-model='activeTab'       
  align-tabs="center"
  color="indigo-lighten-2"
  :fixed-tabs="true"
  class="custom-tabs"
)
  v-tab(:to="{ name: 'AffiliateDashboard' }" ) {{ t('Платежи') }}
  v-tab(:to="{ name: 'BillingHistory' }") {{ t('История оплат') }}
v-tabs-items(v-model='activeTab')
  v-tab-item
    .my-6
    router-view


</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { appStore } from "@/app/app"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

// Иконки
import { } from '@icons/24/solid'

// Глобальное хранилище, роуты, локали
const store = storeFile(), app = appStore(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

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

<style scoped lang="scss">

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