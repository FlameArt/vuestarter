<template lang="pug">
.p-10(class='sm:flex sm:flex-col sm:align-center')
  .relative.self-center.bg-slate-200.rounded-lg.flex(class='p-0.5')
    button.relative.rounded-md.py-2.text-sm.font-medium.whitespace-nowrap.bg-slate-50.border-slate-50.text-slate-900.shadow-sm(type='button' class='w-1/2 focus:outline-none sm:w-auto sm:px-8')
      | Monthly
      | billing
    button.relative.border.rounded-md.py-2.text-sm.font-medium.whitespace-nowrap.border-transparent.text-slate-900(type='button' class='ml-0.5 w-1/2 focus:outline-none sm:w-auto sm:px-8')
      | Yearly
      | billing
  .mt-12.space-y-3(class='sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3')
    .border.border-slate-200.rounded-lg.shadow-sm.divide-y.divide-slate-200
      .p-6
        h2.text-xl.leading-6.font-bold.text-slate-900 Starter
        p.mt-2.text-base.text-slate-700.leading-tight
          | For new makers who want to fine-tune and test an
          | idea.
        p.mt-8
          span.text-4xl.font-bold.text-slate-900.tracking-tighter $0
          span.text-base.font-medium.text-slate-500 /mo
        a.mt-8.block.w-full.bg-slate-900.rounded-md.py-2.text-sm.font-semibold.text-white.text-center(href='/sign-up')
          | Join
          | as a Starter
      .pt-6.pb-8.px-6
        h3.text-sm.font-bold.text-slate-900.tracking-wide.uppercase What&apos;s included
        ul.mt-4.space-y-3(role='list')
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 1 landing page included
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 1,000 visits/mo
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 Access to all UI blocks
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 50 conversion actions included
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 5% payment commission
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 Real-time analytics
    .border.border-slate-200.rounded-lg.shadow-sm.divide-y.divide-slate-200
      .p-6
        h2.text-xl.leading-6.font-bold.text-slate-900 Superior
        p.mt-2.text-base.text-slate-700.leading-tight
          | For creators with multiple ideas who want to
          | efficiently test and refine them.
        p.mt-8
          span.text-4xl.font-bold.text-slate-900.tracking-tighter $8
          span.text-base.font-medium.text-slate-500 /mo
        a.mt-8.block.w-full.bg-slate-900.rounded-md.py-2.text-sm.font-semibold.text-white.text-center(href='/sign-up')
          | Join
          | as a Superior
      .pt-6.pb-8.px-6
        h3.text-sm.font-bold.text-slate-900.tracking-wide.uppercase What&apos;s included
        ul.mt-4.space-y-3(role='list')
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 All Free features
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 5 landing pages included
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 50,000 visits/mo
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 1,000 conversion actions included
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 1% payment commission
    .border.border-slate-200.rounded-lg.shadow-sm.divide-y.divide-slate-200
      .p-6
        h2.text-xl.leading-6.font-bold.text-slate-900 Shipper
        p.mt-2.text-base.text-slate-700.leading-tight
          | For productive shippers who want to work more
          | efficiently.
        p.mt-8
          span.text-4xl.font-bold.text-slate-900.tracking-tighter $15
          span.text-base.font-medium.text-slate-500 /mo
        a.mt-8.block.w-full.bg-slate-900.rounded-md.py-2.text-sm.font-semibold.text-white.text-center(href='/sign-up')
          | Join
          | as a Shipper
      .pt-6.pb-8.px-6
        h3.text-sm.font-bold.text-slate-900.tracking-wide.uppercase What&apos;s included
        ul.mt-4.space-y-3(role='list')
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 All Standard features
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 20 landing pages included
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 200,000 visits/mo
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 5,000 conversion actions included
          li.flex.space-x-3
            svg.flex-shrink-0.h-5.w-5.text-green-400(xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewbox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true')
              path(stroke='none' d='M0 0h24v24H0z' fill='none')
              path(d='M5 12l5 5l10 -10')
            span.text-base.text-slate-700 No payment commission

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