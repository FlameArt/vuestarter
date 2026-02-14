<template>
  <!-- .flex.justify-center.h-screen.items-center.flex-col -->
  <!-- h3.text-xl.font-bold.text-center Вход -->
  <!-- .px-8.py-6.mt-4.text-left.bg-white.shadow-lg(class="desktop:w-[700px]") -->
  <div class="mt-0">
    <div class="h-4 mb-3 text-gray-400">Войти через</div>
    <div class="flex text-sm flex-col desktop:flex-row">
      <a class="flex flex-1 items-center" href="/auth/social?authclient=google">
        <img class="max-h-8" src="/src/assets/icons/google.svg" />
        <span class="pl-6">Google</span>
      </a>
      <a class="flex flex-1 items-center" href="/auth/social?authclient=facebook" v-if="store.User.country !== 'RU'">
        <img class="max-h-8" src="/src/assets/icons/facebook.svg" />
        <span class="pl-6">Facebook</span>
      </a>
    </div>
  </div>
  <div class="h-4 mb-3 text-gray-400 text-xs mt-4 desktop:mt-6 desktop:text-sm">Или с помощью почты и пароля</div>

  <div class="mt-4"></div>
  <div>
    <label class="block">
      <input
        class="font-semibold text-lg w-full outline-none px-4 py-2 mt-0 rounded-md border-b border-b-black focus:outline-hidden focus:ring-1 focus:ring-blue-600 placeholder:text-gray-500"
        v-model="state.login"
        name="email"
        type="email"
        placeholder="Почта"
      />
      <span class="text-xs tracking-wide text-red-600">{{ state.loginErr }}</span>
    </label>
    <div class="mt-2"></div>
    <label class="block">
      <input
        class="font-semibold text-lg w-full outline-none px-4 py-2 mt-0 rounded-md border-b border-b-black focus:outline-hidden focus:ring-1 focus:ring-blue-600 placeholder:text-gray-500"
        v-model="state.passw"
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <div class="my-2 text-xs tracking-wide text-red-600">{{ state.passwErr }}</div>
      <a class="my-4 text-xs text-gray-500 cursor-pointer hover:underline" @click="router.push({ name: 'ResetPasswordRequest' })">
        Я забыл свой пароль
      </a>
    </label>

    <div class="flex mt-5 items-center justify-between flex-col">
      <button
        class="px-6 py-2 mt-4 text-xl text-white bg-black rounded-lg w-full hover:bg-blue-900"
        @click="Login()"
      >
        Войти
      </button>
    </div>

    <div class="pt-2 text-center">
      <a class="text-xs text-gray-500 cursor-pointer hover:underline" @click="router.push({ name: 'Signup' })">
        Зарегистрироваться
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Auth from '../../models/Auth';
import Analytics from '@/models/base/Analytics';

const store = storeFile();
const router = useRouter(),
  route = useRoute();

const state = reactive({
  login: "",
  passw: "",
  loginErr: "",
  passwErr: "",
});

onMounted(() => { });

let Login = async () => {

  const res = await Auth.Auth(state.login, state.passw);
  if (!res.success) {
    [state.loginErr, state.passwErr] = [res.loginErr ?? "", res.passwErr ?? ""];
  }
  else {

    Analytics.track('auth_' + (store.platform), { category: 'users' });

    router.push({ name: 'Home' })

  }

};
</script>

<style scoped lang="scss"></style>
