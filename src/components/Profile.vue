<template lang="pug">
.bg-container.px-3
.px-3.pt-5.w-full.z-50

  // Заголовок
  Header

  div.w-full.px-3.my-5.text-center.pb-5
    .text-2xl.mt-5.relative.text-white.mb-5 Мой профиль
    v-text-field(label='Имя' bg-color="white" v-model="state.name")
    .mt-1.relative.text-white.mb-5 Можете указать информацию о себе, если хотите (необязательно)
    //v-textarea(label='Биография' bg-color="white"  v-model="state.Settings.profile_bio" rows="3")
    v-btn.ml-auto.mt-5.text-center(@click='save()') Сохранить
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import Usersettings from '../../models/Usersettings';
import User from '../../models/User';
import Auth from '@/models/Auth';
import Header from './Header.vue';

// Глобальное хранилище и роуты
const store = storeFile(), router = useRouter(), route = useRoute();

// Входящие данные компонента
const props = defineProps<{
  data?: any
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  Settings: new Usersettings as Usersettings,
  name: ""
})

// Грузим настройки
Auth.WaitAuth().then(() =>
  Usersettings.one(store.User.id)
).then(res => {
  if (res)
    state.Settings.load(res)
  state.name = store.User.name;
})

const save = async () => {
  User.edit(store.User.id, { name: state.name, });
  state.Settings.save();
  if (route.name === 'WelcomeProfile') {
    router.push({ name: 'TimeSelector' })
  }
  else {
    router.push({ name: 'MySettings' })
  }
}

</script>

<style scoped lang="scss">
.bg-container {
  background: linear-gradient(180deg, #7986E6 8.95%, #D7CAF4 100%);
  position: absolute;
  inset: 0;
}
</style>
