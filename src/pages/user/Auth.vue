<template lang="pug">
.flex.justify-center.h-screen.items-center.flex-col
  //h3.text-xl.font-bold.text-center Вход
  .px-8.py-6.mt-4.text-left.bg-white.shadow-lg.lg:w-[700px]
    .mt-0
      .h-4.mb-3.text-gray-400 Войти через
      .flex.text-sm.flex-col.lg:flex-row
        a.flex.flex-1.items-center(href="/auth/social?authclient=google")
          img.max-h-8(src="/src/assets/icons/google.svg")
          span.pl-6 Google
        a.flex.flex-1.items-center(
          href="/auth/social?authclient=facebook",
          v-if="store.User.country !== 'RU'"
        )
          img.max-h-8(src="/src/assets/icons/facebook.svg")
          span.pl-6 Facebook
    .h-4.mb-3.text-gray-400.text-xs.mt-4.lg:mt-6.lg:text-sm Или с помощью почты и пароля

    .mt-4
      label.block
        input.w-full.px-4.py-2.mt-0.border.rounded-md.focus:outline-none.focus:ring-1.focus:ring-blue-600.placeholder:text-gray-500(
          v-model="state.login",
          name="email",
          type="text",
          placeholder="Почта",
        )
        span.text-xs.tracking-wide.text-red-600 {{ state.loginErr }}
      .mt-2
      label.block
        input.w-full.px-4.py-2.mt-0.border.rounded-md.focus:outline-none.focus:ring-1.focus:ring-blue-600.placeholder:text-gray-500(
          v-model="state.passw",
          name="password",
          type="password",
          placeholder="Пароль",
        )
        .my-2.text-xs.tracking-wide.text-red-600 {{ state.passwErr }}
        a.my-4.text-xs.text-gray-500.cursor-pointer.hover:underline(
          @click="router.push({ name: 'ResetPasswordRequest' })"
        ) Я забыл свой пароль

      .flex.items-center.justify-between.flex-col
        button.px-6.py-2.mt-4.text-white.bg-blue-600.rounded-lg.w-full.cursor-pointer.hover:bg-blue-900(
          @click="Login()"
        ) Войти

      .pt-2.text-center
        a.text-xs.text-gray-500.cursor-pointer.hover:underline(
          @click="router.push({ name: 'Signup' })"
        ) Зарегистрироваться
</template>

<script setup>
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { storeFile } from "src/store";
import { useRoute, useRouter } from "vue-router";

const store = storeFile();
const router = useRouter(),
  route = useRoute();

const state = reactive({
  login: "",
  passw: "",
  loginErr: "",
  passwErr: "",
});

onMounted(() => {});

let Login = () => {
  window.REST.auth(state.login, state.passw).then((res) => {
    if (res.data.isAuthorized) {
      store.User = res.User;
      router.push({ name: "Home" });
    } else {
      if (res.data.errors) {
        state.loginErr = (
          res.data.errors["email"] ??
          res.data.errors["login"] ??
          []
        ).join(". ");
        state.passwErr = (res.data.errors["password"] ?? []).join(". ");
      }
    }
  });
};
</script>

<style scoped lang="scss">
</style>
