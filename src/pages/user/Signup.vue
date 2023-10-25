<template lang="pug">


div

  // Регистрация через соц-сети
  //.mt-0
    .h-4.mb-3.text-gray-400 Быстрая регистрация через
    //.flex.text-sm.flex-col(class="desktop:flex-row")
      a.flex.flex-1.items-center(href="/auth/social?authclient=google")
        img.max-h-8(src="/src/assets/icons/google.svg")
        span.pl-6 Google
      //a.flex.flex-1.items-center(
        href="/auth/social?authclient=facebook",
        v-if="store.User.country !== 'RU'")
        img.max-h-8(src="/src/assets/icons/facebook.svg")
        span.pl-6 Facebook

  //.h-4.mb-3.text-gray-400.text-xs.mt-4(class="desktop:mt-6 desktop:text-sm") Или введите почту и пароль

  // Имя пользователя
  label.block
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b-2.border-b.border-b-black(
      v-model="state.name",
      name="name",
      type="text",
      placeholder="Ваше имя",
      class=" placeholder:text-gray-500"
    )
    span.text-xs.tracking-wide.text-red-600 {{ state.errors['name']?.join(". ") }}

  // Почта
  label.block.mt-2
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b.border-b-black(
      v-model="state.email",
      name="email",
      type="email",
      placeholder="Почта",
      class="placeholder:text-gray-500"
    )
    span.text-xs.tracking-wide.text-red-600 {{ state.errors['email']?.join(". ") }}

  // Пароль
  label.block.mt-2
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b.border-b-black(
      v-model="state.passw",
      name="password",
      type="password",
      placeholder="Пароль",
      class="placeholder:text-gray-500"
    )
    span.my-4.text-xs.tracking-wide.text-red-600 {{ state.errors['password']?.join(". ") }}


  // Соглашение
  .mt-6
  div.text-md.text-left(style="font-size: 15px;")
    div.text-gray-800.font-bold Нажимая Регистрация, я соглашаюсь с
    ol(style="list-style: circle;")
      li(style="margin-left: 30px; padding-left:10px;")
        RouterLink.linkDocs(v-if="store.isMobile" to="/privacy") Политикой конфиденциальности
        RouterLink.linkDocs(v-if="!store.isMobile" to="/privacy-web") Политикой конфиденциальности
      li(style="margin-left: 30px; padding-left:10px;")
        RouterLink.linkDocs(to="/terms") Пользовательским соглашением и Политикой обработки персональных данных


  // Кнопка реги
  .flex.mt-5.items-center.justify-between.flex-col
    button.px-6.py-2.mt-4.text-xl.text-white.bg-black.text-white.rounded-lg(
      @click="Signup()",
      class="w-full hover:bg-blue-900"
    ) Регистрация


  // Ссылка на Войти
  .mt-6
  div.text-md.text-center УЖЕ ЕСТЬ АККАУНТ?
  div.cursor-pointer.text-center.text-xl.tracking-wide.underline.font-bold(@click="router.push('/in')") ВОЙТИ


</template>

<script setup lang="ts">
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
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
  Auth.Signup(state.email, state.passw, state.name).then(res => {

    if (res.success === true) {
      // Успешная регистрация
      // router.push({ name: 'Home' })

      router.push('/welcome/profile')

    }
    else {
      state.errors = res.errors ?? []
    }
  })
};
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

.linkDocs {
  text-decoration: underline;
  color: #3755fa;
}
</style>
