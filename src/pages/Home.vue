<template lang="pug">

v-main(class="desktop:desktopwidth mobile:mobilewidth desktop:mx-auto" :class="store.platform === 'ios' ? ' mt-[20px] ' : ''")

  Header

  div(v-if="store.User.isLoaded || !settingsFile().authRequired")
    div(v-if="settingsFile().authRequired && Auth.isAuthorized() || !settingsFile().authRequired")
      router-view
    div(v-else)
      Signup


  // Кнопки снизу
  v-bottom-navigation(v-model="state.tab" grow)
    v-btn(value='home' @click="router.push({name: 'Home'})")
      v-icon mdi-home
    v-btn(value='settings' @click="router.push({name: 'MySettings'})")
      v-icon mdi-cog
  router-view


</template>

<script setup lang="ts">

// Основные импорты
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { settingsFile } from '@/settings'; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Signup from './user/Signup.vue';
import Header from '@/components/Header.vue';
import Auth from '@/models/Auth';

// Иконки
import { XCircleIcon } from '@icons/24/solid'

const store = storeFile(), router = useRouter(), route = useRoute();

// Состояние компонента
const state = reactive({
  tab: 'home',
});


onMounted(() => {
});




</script>

<style scoped lang="scss"></style>
