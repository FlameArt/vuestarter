<template lang="pug">
.flex.justify-center.h-screen.items-center.flex-col

  .px-8.py-6.mt-4.text-left.bg-white.shadow-lg.desktop:w-feed

    // Регистрация через соц-сети
    .mt-0
      .h-4.mb-3.text-gray-400 Быстрая регистрация через
      .flex.text-sm.flex-col.desktop:flex-row
        a.flex.flex-1.items-center(href="/auth/social?authclient=google")
          img.max-h-8(src="/src/assets/icons/google.svg")
          span.pl-6 Google
        a.flex.flex-1.items-center(
          href="/auth/social?authclient=facebook",
          v-if="store.User.country !== 'RU'"
        )
          img.max-h-8(src="/src/assets/icons/facebook.svg")
          span.pl-6 Facebook

    .h-4.mb-3.text-gray-400.text-xs.mt-4.desktop:mt-6.desktop:text-sm Или введите почту и пароль

    // Регистрация через логин и пароль
    .mt-4

      // Имя пользователя
      label.block
        input.w-full.px-4.py-2.mt-0.border.rounded-md.focus:outline-none.focus:ring-1.focus:ring-blue-600.placeholder:text-gray-500(
          v-model="state.name",
          name="name",
          type="text",
          placeholder="Ваше имя или никнейм, который увидят другие",
        )
        span.text-xs.tracking-wide.text-red-600 {{ state.errors['name']?.join(". ") }}

      // Почта
      label.block.mt-2
        input.w-full.px-4.py-2.mt-0.border.rounded-md.focus:outline-none.focus:ring-1.focus:ring-blue-600.placeholder:text-gray-500(
          v-model="state.email",
          name="email",
          type="text",
          placeholder="Почта",
        )
        span.text-xs.tracking-wide.text-red-600 {{ state.errors['email']?.join(". ") }}

      // Пароль
      label.block.mt-2
        input.w-full.px-4.py-2.mt-0.border.rounded-md.focus:outline-none.focus:ring-1.focus:ring-blue-600.placeholder:text-gray-500(
          v-model="state.passw",
          name="password",
          type="password",
          placeholder="Пароль",
        )
        span.my-4.text-xs.tracking-wide.text-red-600 {{ state.errors['password']?.join(". ") }}

      // Кнопка реги
      .flex.items-center.justify-between.flex-col
        button.px-6.py-2.mt-4.text-white.bg-blue-600.rounded-lg.w-full.hover:bg-blue-900(
          @click="Signup()"
        ) Регистрация

</template>

<script setup lang="ts">
import { onMounted, reactive, defineProps } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Auth from '@/models/Auth';

const store = storeFile();
const router = useRouter(),
  route = useRoute();

const state = reactive({
  email: "",
  passw: "",
  name: "",
  errors: [] as { [key: string]: any }
});

onMounted(() => { });

let Signup = () => {
  REST.signup(state.email, null, state.passw, state.name).then((res) => {
    if (res.isAuthorized === true) {
      store.authUser(res);
      store.User.isLoaded = true;
      Auth.SaveToken(res.token);
      router.push({ name: "Home" });
      return;
    }
    if (res.errors) {
      state.errors = res.errors;
    }
  });
};
</script>

<style scoped lang="scss"></style>
