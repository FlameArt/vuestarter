<template>
  <div>
    <h1 class="text-2xl">УДАЛЕНИЕ АККАУНТА</h1>
    <div class="my-5">Это инструкция для удаления аккаунта на сайте или в мобильных приложениях {{ settingsFile().appName }} (аккаунт на сайте и в приложениях общий)</div>
    <div class="my-5">
      Для удаления вашего аккаунта
      <ol class="list-decimal">
        <li>Войдите в ваш аккаунт в приложении или на сайте, если этого ещё не сделано</li>
        <li>Перейдите в Настройки</li>
        <li>Нажмите кнопку Удалить аккаунт</li>
        <li>Подтвердите</li>
        <li>Появится окно ввода. Введите указанное слово для окончательного подтверждения и удаления аккаунта</li>
      </ol>
    </div>
    <div class="my-5">
      <b>ВНИМАНИЕ:</b>
      <span>это действие НЕЛЬЗЯ ОТМЕНИТЬ. Оно удаляет ВСЮ связанную с аккаунтом информацию. Включая ваши оплаченные покупки и достижения. Подумайте дважды перед тем как это делать.</span>
    </div>
    <div class="font-bold mt-5">
      Вы так же можете связаться с нами по почте с пометкой в названии темы УДАЛИТЬ АККАУНТ &nbsp;
      <a class="text-blue-600" :href="'mailto:' + settingsFile().legal.ContactEmail">{{ settingsFile().legal.ContactEmail }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from 'vue'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

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
