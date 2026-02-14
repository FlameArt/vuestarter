<template>
  <div>
    <!-- Почта -->
    <label class="block mt-2">
      <input
        class="font-semibold text-lg w-full outline-none px-4 py-2 mt-0 rounded-md border-b border-b-black placeholder:text-gray-500"
        v-model="state.email"
        name="email"
        type="email"
        placeholder="Почта"
      />
      <span class="text-xs tracking-wide text-red-600">{{ state.errors['email']?.join(". ") }}</span>
    </label>

    <!-- Кнопка восстановить пароль -->
    <div class="flex mt-5 items-center justify-between flex-col">
      <button
        class="px-6 py-2 mt-4 text-xl text-white bg-black rounded-lg w-full hover:bg-blue-900"
        @click="ResetPasswordRequest()"
      >
        Продолжить
      </button>
    </div>

    <div class="mt-5"></div>
    <div class="bg-green-300 px-5 py-1" v-if="state.isGoodResult">
      Письмо со ссылкой на сброс пароля успешно отправлено на <span class="font-bold">{{ state.email }}</span>
      <div>Должно прийти в течении 30 минут. Если не приходит, проверьте папку Спам</div>
    </div>
    <div class="flex bg-red-300 px-5 py-1" v-if="state.errors.length > 0">{{ state.errors.join(". ") }}</div>

    <!-- Ссылка на Войти -->
    <div class="mt-6"></div>
    <div class="text-md text-center">ВЕРНУТЬСЯ К ФОРМЕ ВХОДА</div>
    <div class="cursor-pointer text-center text-md tracking-wide underline font-bold" @click="router.push('/in')">ВОЙТИ</div>
  </div>
</template>

<script setup lang="ts">

import { onMounted, reactive } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Auth from '@/models/Auth';
import Analytics from '@/models/base/Analytics';
const store = storeFile(); const router = useRouter(), route = useRoute();

// Состояние компонента
const state = reactive({
  email: "",
  errors: [] as { [key: string]: any },
  isGoodResult: false
})

onMounted(() => {

})

const ResetPasswordRequest = async () => {
  var res = await Auth.ResetPasswordRequest(state.email);
  if (res.result === 'error') {
    state.errors = res.message;
    return;
  }
  else {
    Analytics.track('resetpasswordrequest_' + (store.platform), { category: 'users' });
    state.isGoodResult = true;
  }
}

</script>

<style scoped lang="scss"></style>
