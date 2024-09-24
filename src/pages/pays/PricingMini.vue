<template lang="pug">

div(class="mobile:px-5")

  // Миникнопки
  .font-light.my-6 {{ t('Выберите тариф') }}
  div(class="mobile:fb")

    .minibutton(v-for = "sub in state.subscriptions" class="desktop:ml-5" :class="state.selectedSubcription === sub.id ? 'bg-slate-200' : ''" @click="state.selectedSubcription = sub.id")
      span {{sub.price}}$ / {{sub.countItems}} {{ t('credits') }}


  // Методы оплат
  .mt-5
  .font-light.my-6 {{ t('Способ оплаты') }}
  div.cursor-pointer.py-5.border-b-2.border-b-slate-200(class="desktop:px-5 mobile:px-2" :class="(indx === 0 ? ' border-t-2 border-t-slate-200 ' : '') + (state.selectedPayMethod === indx ? ' bg-slate-200 ' : '') + ' hover:bg-slate-100 '" v-for="(method, indx) in state.payMethods" @click="state.selectedPayMethod = indx; gopay()" )
    span.mr-6 {{ t(method.name) }}
    span.mr-8(v-if="store.pays.WaitLink === indx")
      .lds-ring
        div
        div
        div
        div
    img.inline-block.mr-5.max-h-5.max-w-8.opacity-25(v-for="img in method.img" :src="'/img/paymethods/' + img + '.svg'")




</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';

// Иконки
import { } from '@icons/24/solid'
import Pays from '@/models/Pays';
import Subscriptions from '@models/Subscriptions';

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
  selectedSubcription: 1,
  payMethods: [
    { name: 'СБП РФ', billing: 'LAVA', 'type': 'sbp', img: ['sbp'], region: ['ru'] },
    { name: 'Банковская карта РФ', billing: 'LAVA', 'type': 'card', img: ['visa', 'mir', 'mastercard', 'unionpay'] },
  ],
  subscriptions: [] as Subscriptions[],
  selectedPayMethod: -1
})

if (location.hostname === 'metamonkey') {
  state.payMethods.push({
    billing: 'TestPaymentSystem',
    name: 'Тестовая платёжная система',
    type: 'none',
    img: [],
    region: ['ru', 'en'],
  });
}

// Получаем все подписки
Subscriptions.all().then(r => {

  if (r.data)
    state.subscriptions = r.data

})

const gopay = () => {
  if (state.selectedPayMethod === -1) return;
  const pay = state.payMethods[state.selectedPayMethod];
  Pays.GoToPay({
    subscription: state.selectedSubcription,
    paymethod: pay.type,
    paysystem: pay.billing as any,
    total: 1
  }, state.selectedPayMethod);
}



</script>

<style scoped lang="scss">
.minibutton {
  @apply inline-block cursor-pointer rounded-2xl border-slate-200 border-2 px-4 py-2
}

.minibutton:hover {
  @apply bg-slate-200
}

// Спиннер ожидания оплаты
.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 24px;
  height: 24px;
  margin: 8px;
  border: 5px solid #0f6a16;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #0f6a16 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>


<i18n>
{
  "en": {
    "credits": "credits",
    "Банковская карта РФ": "Card (only russian)",
    "СБП РФ": "SBP",
    "Тестовая платёжная система": "Test payment system",
    "Выберите тариф": "Choose a Plan",
    "Способ оплаты": "Payment method"
  },  
  "ru": {
    "credits": "кредитов",
    "Банковская карта РФ": "Банковская карта РФ",
    "СБП РФ": "СБП (рекомендовано)",
    "Тестовая платёжная система": "Тестовая платёжная система",
    "Выберите тариф": "Выберите тариф",
    "Способ оплаты": "Способ оплаты"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>