<template lang="pug">
//.flex.justify-center.h-screen.items-center.flex-col
//h3.text-xl.font-bold.text-center Вход
//.px-8.py-6.mt-4.text-left.bg-white.shadow-lg(class="desktop:w-[700px]")
  .mt-0
    .h-4.mb-3.text-gray-400 Войти через
    .flex.text-sm.flex-col(class="desktop:flex-row")
      a.flex.flex-1.items-center(href="/auth/social?authclient=google")
        img.max-h-8(src="/src/assets/icons/google.svg")
        span.pl-6 Google
      a.flex.flex-1.items-center(
        href="/auth/social?authclient=facebook",
        v-if="store.User.country !== 'RU'"
      )
        img.max-h-8(src="/src/assets/icons/facebook.svg")
        span.pl-6 Facebook
  .h-4.mb-3.text-gray-400.text-xs.mt-4(class="desktop:mt-6 desktop:text-sm") Или с помощью почты и пароля

  .mt-4
div
  label.block
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b.border-b-black(
      v-model="state.login",
      name="email",
      type="email",
      placeholder="Почта",
      class=" focus:outline-hidden focus:ring-1 focus:ring-blue-600 placeholder:text-gray-500"
    )
    span.text-xs.tracking-wide.text-red-600 {{ state.loginErr }}
  .mt-2
  label.block
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b.border-b-black(
      v-model="state.passw",
      name="password",
      type="password",
      placeholder="Пароль",
      class="focus:outline-hidden focus:ring-1 focus:ring-blue-600 placeholder:text-gray-500"
    )
    .my-2.text-xs.tracking-wide.text-red-600 {{ state.passwErr }}
    a.my-4.text-xs.text-gray-500.cursor-pointer(
      @click="router.push({ name: 'ResetPasswordRequest' })", 
      class="hover:underline"
    ) Я забыл свой пароль

  .flex.mt-5.items-center.justify-between.flex-col
    button.px-6.py-2.mt-4.text-xl.text-white.bg-black.text-white.rounded-lg(
      @click="Login()",
      class="w-full hover:bg-blue-900"
    ) Войти


  .pt-2.text-center
    a.text-xs.text-gray-500.cursor-pointer(
      @click="router.push({ name: 'Signup' })", 
      class="hover:underline"
    ) Зарегистрироваться

</template>

<script setup lang="ts">
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
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
