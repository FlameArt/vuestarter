<template lang="pug">


div

  // Почта
  label.block.mt-2
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b.border-b-black(
      v-model="state.email",
      name="email",
      type="email",
      :placeholder="t('E-mail')",
      class="placeholder:text-gray-500"
    )
    span.text-xs.tracking-wide.text-red-600 {{ state.errors['email']?.join(". ") }}


  // Соглашение
  .mt-6
  div.text-md.text-left(style="font-size: 15px;")
    div.text-gray-800.font-bold {{ t('Нажимая Регистрация, я соглашаюсь с')}}
    ol(style="list-style: circle;")
      li(style="margin-left: 30px; padding-left:10px;")
        RouterLink.linkDocs(v-if="store.isMobile" to="/privacy") {{t('Политикой конфиденциальности и обработки персональных данных')}}
        RouterLink.linkDocs(v-if="!store.isMobile" to="/privacy-web") {{t('Политикой конфиденциальности и обработки персональных данных')}}
      li(style="margin-left: 30px; padding-left:10px;")
        RouterLink.linkDocs(to="/terms") {{t('Публичной офертой')}}


  // Кнопка реги
  .flex.mt-5.items-center.justify-between.flex-col
    button.px-6.py-2.mt-4.text-xl.text-white.bg-black.text-white.rounded-lg(
      @click="Signup()",
      class="w-full hover:bg-blue-900"
    ) {{t('Регистрация')}}


  // Ссылка на Войти
  .mt-6
  div.text-md.text-center {{ t('УЖЕ ЕСТЬ АККАУНТ?') }}
  div.cursor-pointer.text-center.text-xl.tracking-wide.underline.font-bold(@click="router.push('/in')") {{ t('ВОЙТИ')}}


</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"; import { useI18n } from 'vue-i18n';
import Auth from '@/models/Auth';
import Analytics from '@/models/base/Analytics';
import Core from '@/models/Core';

const store = storeFile(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true, useScope: 'local' });

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

      Analytics.track('register_' + (store.platform), { category: 'users' });
      router.push({ name: 'Home' })

    }
    else {
      state.errors = Core.TranslateErrors(res, t)
    }
  })
};
</script>

<i18n>
{
  "en": {
    "E-mail": "E-mail",
    "Нажимая Регистрация, я соглашаюсь с": "By clicking Singup, I agree to",
    "Политикой конфиденциальности и обработки персональных данных": "Privacy Policy and Data Processing Policy",
    "Публичной офертой": "Terms and Conditions",
    "Регистрация": "Signup",
    "ВОЙТИ": "SIGN IN",
    "УЖЕ ЕСТЬ АККАУНТ?": "ALREADY HAVE AN ACCOUNT?",
    "Вы должны указать email": "You must provide an email address",
  },  
  "ru": {
    "E-mail": "E-mail",
    "Нажимая Регистрация, я соглашаюсь с": "Нажимая Регистрация, я соглашаюсь с",
    "Политикой конфиденциальности и обработки персональных данных": "Политикой конфиденциальности и обработки персональных данных",
    "Публичной офертой": "Публичной офертой",
    "Регистрация": "Регистрация",
    "ВОЙТИ": "ВОЙТИ",
    "УЖЕ ЕСТЬ АККАУНТ?": "УЖЕ ЕСТЬ АККАУНТ?",
    "Вы должны указать email": "Вы должны указать email",

  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>

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
