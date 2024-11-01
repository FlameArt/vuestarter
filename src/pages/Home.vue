<template lang="pug">

v-main(class="desktop:desktopwidth mobile:mobilewidth desktop:mx-auto" :class="store.platform === 'ios' ? ' mt-[20px] ' : ''")

  Header

  div(v-if="store.User.isLoaded || !settingsFile().authRequired")
    div(v-if="settingsFile().authRequired && Auth.isAuthorized() || !settingsFile().authRequired")
      router-view
    div(v-else)
      Signup


  // Кнопки снизу
  v-bottom-navigation.adaptive-navigation.testnav(v-if="store.User.id !== 0"  grow style='opacity: 0.9; padding-bottom: env(safe-area-inset-bottom)')
    v-btn(value='home' @click="router.push({name: 'HomePage'})")
      img.w-8.h-8(src="/img/menu-home.svg")
    v-btn(value='settings' @click="router.push({name: 'MySettings'})")
      img.w-8.h-8(src="/img/menu-settings.svg")


</template>

<script setup lang="ts">

// Основные импорты
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { settingsFile } from '@/settings'; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Signup from './user/Signup.vue';

// Иконки
import { XCircleIcon } from '@icons/24/solid'

const store = storeFile(), router = useRouter(), route = useRoute();

// Состояние компонента
const state = reactive({
  test: 5
})


onMounted(() => {
});




</script>

<style scoped lang="scss"></style>
