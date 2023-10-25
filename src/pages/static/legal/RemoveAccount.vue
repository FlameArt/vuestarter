<template lang="pug">
div
  h1.text-2xl УДАЛЕНИЕ АККАУНТА
  .my-5 Это инструкция для удаления аккаунта на сайте или в мобильных приложениях {{ settingsFile().appName }} (аккаунт на сайте и в приложениях общий)
  div.my-5 Для удаления вашего аккаунта 
    ol.list-decimal 
      li Войдите в ваш аккаунт в приложении или на сайте, если этого ещё не сделано
      li Перейдите в Настройки
      li Нажмите кнопку Удалить аккаунт
      li Подтвердите
      li Появится окно ввода. Введите указанное слово для окончательного подтверждения и удаления аккаунта
  div.my-5
    b ВНИМАНИЕ: 
    span это действие НЕЛЬЗЯ ОТМЕНИТЬ. Оно удаляет ВСЮ связанную с аккаунтом информацию. Включая ваши оплаченные покупки и достижения. Подумайте дважды перед тем как это делать.
  div.font-bold.mt-5 Вы так же можете связаться с нами по почте с пометкой в названии темы УДАЛИТЬ АККАУНТ &nbsp;
    a.text-blue-600(:href="'mailto:'+settingsFile().legal.ContactEmail") {{ settingsFile().legal.ContactEmail }}
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import { settingsFile } from '@/settings';

// Глобальное хранилище и роуты
const store = storeFile(), router = useRouter(), route = useRoute();

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
