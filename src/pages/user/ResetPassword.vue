<template lang="pug">
div

  // Почта
  label.block.mt-2
    input.font-semibold.text-lg.w-full.outline-none.px-4.py-2.mt-0.rounded-md.border-b.border-b-black(
      v-model="state.newPassword",
      name="newPassword",
      type="password",
      placeholder="Новый пароль",
      class="placeholder:text-gray-500"
    )
    span.text-xs.tracking-wide.text-red-600 {{ state.errors['email']?.join(". ") }}

  // Кнопка восстановить пароль
  .flex.mt-5.items-center.justify-between.flex-col
    button.px-6.py-2.mt-4.text-xl.text-white.bg-black.text-white.rounded-lg(
      @click="ResetPassword()",
      class="w-full hover:bg-blue-900"
    ) Сохранить новый пароль


  .flex.bg-green-300.mt-5.px-5.py-1(v-if="state.isGoodResult") 
    div ПАРОЛЬ УСПЕШНО УСТАНОВЛЕН!
    div Теперь вы можете войти с новым паролем
    div.cursor-pointer.text-center.text-md.tracking-wide.underline.font-bold(@click="router.push('/in')") ВОЙТИ


  .flex.bg-red-300.mt-5.px-5.py-1(v-if="state.errors.length > 0") {{ state.errors.join(". ") }}


  // Ссылка на Войти
  .mt-6
  div.text-md.text-center ВЕРНУТЬСЯ К ФОРМЕ ВХОДА
  div.cursor-pointer.text-center.text-md.tracking-wide.underline.font-bold(@click="router.push('/in')") ВОЙТИ



</template>

<script setup lang="ts">

import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Auth from '@/models/Auth';
import Analytics from '@/models/base/Analytics';
const store = storeFile(); const router = useRouter(), route = useRoute();

const urlParams = new URLSearchParams(window.location.search);

// Состояние компонента
const state = reactive({
  token: urlParams.get('token'),
  newPassword: "",
  errors: [] as { [key: string]: any },
  isGoodResult: false
})


onMounted(() => {

  CheckPassword();

})

const CheckPassword = async () => {
  var res = await Auth.ResetPasswordTokenCheck(state.token ?? "");
  if (res.result === 'error') {
    state.errors = ['Некорректный токен, проверьте ещё раз ссылку в письме', res.message];
    return;
  }
}

const ResetPassword = async () => {
  var res = await Auth.ResetPasswordSaveNewPassword(state.token ?? "", state.newPassword ?? "");
  if (res.result === 'error') {
    state.errors = [res.message];
    return;
  }
  else {
    Analytics.track('resetpasswordcompleted_' + (store.platform), { category: 'users' });
    state.isGoodResult = true;
  }
}

</script>

<style scoped lang="scss"></style>
