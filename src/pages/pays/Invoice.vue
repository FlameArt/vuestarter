<template lang="pug">
div(v-if="state.invoice !== null")
  .text-3xl.my-6 Fiscal Invoice &#35;{{ settingsFile().appName }}-{{ state.invoice.id }}
  .fb
    // Слева на кого выписан инвойс
    div.self-start(class="max-w-[300px]")
      .my-1 Proforma Invoice №{{ state.invoice.id }}
      .my-1 Invoice Date: {{ state.invoice.created_dt }}

    // Справа кто предоставляет услугу
    div.self-start(class="max-w-[300px]")
      .my-1.text-xl {{ settingsFile().legal.OrganizationName.en }}
      .my-1.text VAT ID: {{ settingsFile().legal.OrganizationRegistrationID }}
      .my-1.text {{ settingsFile().legal.OrganizationMailAdress }}

  div(v-if="state.invoice.status === 'COMPLETED'")
    span.text-xl.text-green-600() {{ t('Статус') }}: {{ t('ОПЛАЧЕН') }} {{ state.invoice.updated_dt }}
  div(v-else)
    span.text-xl.text-slate-300  {{ t('Статус') }}: {{ t('ОЖИДАНИЕ ОПЛАТЫ') }}

  table.w-full.border-collapse
    // Header Row
    thead
      tr
        th.border-b-2.border-slate-300.text-left.py-2(class='w-3/4') Description
        th.border-b-2.border-slate-300.text-left.py-2(class='w-1/4') Price
    // Product Rows
    tbody

      // Продукт
      tr
        td.border-b.border-slate-200.py-2 {{ (state.invoice.name ?? "") + " " + (state.invoice.desc ?? "") }} 
        td.border-b.border-slate-200.py-2 {{ parseFloat(state.invoice.total + "").toFixed(2) }} {{ state.invoice.currency }}

      // Total Row
      tr.bg-slate-200
        td.font-bold.text-right.py-2.px-8 Total
        td.font-bold.py-2 {{ parseFloat(state.invoice.total + "").toFixed(2) }} {{ state.invoice.currency }}



</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

// Иконки
import { CheckIcon } from '@icons/24/solid'
import Userorders from '@models/Userorders';
import { settingsFile } from '@/settings';

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
  invoice: null as Userorders | null
})

/**
 * Получить инвойс
 */
const getInvoice = async () => {

  let invoice_id: any = state.invoice?.id ?? null;
  if (invoice_id === null) {
    if (route.params['invoiceid']) {
      invoice_id = route.params['invoiceid'];
    }
    // Нет параметра - просто последний активный инвойс
    else {
      let res = await Userorders.all({ sort: ['-id'], perPage: 1, page: 1 })

      if (!res.data) return;

      state.invoice = res.data[0]

      invoice_id = state.invoice?.id;
    }
  }

  let res = await Userorders.one(invoice_id)

  if (res === null) return;

  state.invoice = res;

}

/**
 * Обновление инфы об инвойсе раз в секунду
 */
let timerInvoiceUpdater: any = null;
getInvoice().then(r => {
  timerInvoiceUpdater = setInterval(() => {
    getInvoice();
  }, 1000);
})

onUnmounted(() => {
  if (timerInvoiceUpdater !== null)
    clearInterval(timerInvoiceUpdater);
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