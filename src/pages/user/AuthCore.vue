<template>
  <div class="container_bg overflow-x-auto" :class="state.isDocs() ? '' : 'fc'">
    <div class="align-middle px-8 py-6 mt-4 text-left desktop:w-feed mobile:w-full">
      <div class="font-bold cursor-pointer" v-if="state.isDocs()" @click="router.back()">⬅ ВЕРНУТЬСЯ НАЗАД</div>

      <div class="mt-3">
        <img class="w-12 h-12" src="/public/img/logo.svg" />
      </div>

      <!-- Регистрация через логин и пароль -->
      <div class="mt-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Auth from '@/models/Auth';
import SignupC from './Signup.vue';

const store = storeFile();
const router = useRouter(),
  route = useRoute();

const state = reactive({
  email: "",
  passw: "",
  name: "",
  errors: [] as { [key: string]: any },
  isDocs: () => route.path === '/privacy' || route.path === '/privacy-web' || route.path === '/terms'
});

onMounted(() => { });

</script>

<style scoped lang="scss">
.container_bg {
  position: absolute;
  inset: 0;
  background-color: #F2D6AE !important;
  background-image: url('/public/img/signup.svg');
  background-position: bottom left;
  background-repeat: no-repeat;
  background-size: auto 35vh;
}
</style>
