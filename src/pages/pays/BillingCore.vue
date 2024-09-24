<template lang="pug">

// Табы
v-tabs.bg-slate-50.text-slate-600(
  v-model='activeTab'       
  align-tabs="center"
  color="indigo-lighten-2"
  :fixed-tabs="true"
  class="custom-tabs"
)
  v-tab(:to="{ name: 'Billing' }" ) {{ t('Платежи') }}
  v-tab(:to="{ name: 'BillingHistory' }") {{ t('История оплат') }}
v-tabs-items(v-model='activeTab')
  v-tab-item
    .my-6
    router-view

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import { watch, type Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

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
  data: {}
})

const activeTab = ref(route.path);

watch(route, (newRoute) => {
  activeTab.value = newRoute.path;
});

onMounted(() => {
  activeTab.value = route.path;
});


</script>

<style scoped lang="scss">
.custom-tabs .v-tab:hover::before {
  border-radius: 0;
  /* Убирает закругление при наведении */
}

.custom-tabs .v-tab::before {
  transition: none;
  /* Убирает анимацию закругления */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


<i18n>
{
  "en": {
    "Платежи": "Payments",
    "История оплат": "Payment History"
  },  
  "ru": {
    "Платежи": "Платежи",
    "История оплат": "История оплат"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>