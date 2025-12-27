<template>
  <div class="bg-container px-3"></div>
  <div class="px-3 pt-5 w-full z-50">
    <!-- ОТЗЫВ -->
    <Header file="new" />

    <div class="w-full px-3 my-5 text-center pb-5">
      <div class="text-2xl mt-5 relative text-white mb-5">СООБЩИТЬ ОБ ОШИБКЕ</div>
      <v-textarea label="ОПИШИТЕ ПРОБЛЕМУ КАК МОЖНО ПОДРОБНЕЕ" bg-color="white" v-model="state.txt" rows="8"></v-textarea>
      <v-btn class="ml-auto mt-5 text-center" @click="save()">ОТПРАВИТЬ</v-btn>
      <div class="relative mt-5 text-center text-green" v-show="state.saved">Ваш отчёт успешно отправлен. Спасибо за замечания!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import Usersettings from '../../models/UserSettings';
import User from '../../models/User';
import Auth from '@/models/Auth';
import Header from './Header.vue';
import Core from '../models/Core';

// Глобальное хранилище и роуты
const store = storeFile(), router = useRouter(), route = useRoute();

// Входящие данные компонента
const props = defineProps<{
  data?: any
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  txt: "",
  saved: false
})

const save = async () => {
  Core.report(state.txt, "USER_REPORT").then((r: any) => {
    state.saved = true;
  });
}

</script>

<style scoped lang="scss">
.v-btn {
  background-color: #d5c193 !important;
  border-radius: 10px !important;
  box-shadow: none;
  letter-spacing: normal;
  font-size: 1rem;
  font-weight: 500;
  text-transform: none;
  width: 100%;
  color: #2a2a2b !important;
  padding: 15px 10px;
  height: auto;
}

.bg-container {
  background: #2a2a2b;
  position: absolute;
  inset: 0;
}
</style>
