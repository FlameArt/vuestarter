<template>
  <div class="px-5">
    <div class="text-2xl font-light">{{ t('История платежей') }}</div>
    <div class="my-2 py-5 border-b-2 border-b-slate-200" v-for="order in state.orders" :key="order.id">
      <div class="cursor-pointer font-normal text-xl hover:bg-slate-100" @click="router.push({ name: 'BillingPaymentInvoice', params: { 'invoiceid': order.id } })">
        <span>{{ t('Счёт') }} №&nbsp;{{ order.id }}</span>
        <span class="text-slate-400">&nbsp;{{ t('от') }} {{ order.created_dt?.split(" ")[0] }}</span>
      </div>
      <div>
        <span class="text-green-600" v-if="order.status === 'COMPLETED'">{{ t('ОПЛАЧЕН') }} {{ order.updated_dt }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from 'vue'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

// Иконки
import { } from '@icons/24/solid'
import Auth from '@/models/Auth';
import Userorders from '@models/UserOrders';

// Глобальное хранилище, роуты, локали
const store = storeFile(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

// Входящие данные компонента
const props = defineProps<{
  data?: any
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  orders: [] as Userorders[]
})

Auth.WaitAuth().then(r => {
  if (!r) return;
  Userorders.all({ sort: ['-id'] }).then(orders => {
    if (orders.data)
      state.orders = orders.data;
  })
})

</script>

<style scoped lang="scss"></style>


<i18n>
{
  "en": {
    "История платежей": "Payment history",
    "Счёт": "Invoice",
    "от": "dated",
    "ОПЛАЧЕН": "PAID",
  },  
  "ru": {
    "История платежей": "История платежей",
    "Счёт": "Счёт",
    "от": "от",
    "ОПЛАЧЕН": "ОПЛАЧЕН",

  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>
