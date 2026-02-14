<template>
  <!-- <ArrowLeftCircleIcon.float-right.w-8.h-8.fill-slate-400(@click="router.push({name: 'MySettings'})" style="z-index: 9999;position: absolute;" v-show="route.name !== 'MySettings'") -->

  <div class="bg-container"></div>
  <!-- Каталог медитаций -->
  <div class="px-3 pt-5">
    <Header file="white" v-if="route.name === 'MySettings'" />
  </div>

  <RouterView class="px-3" />
  <div class="px-3 pt-5 w-full z-50"></div>

  <div class="absolute inset-0 fc flex-col flex-start px-3" v-show="route.name === 'MySettings'">
    <v-avatar class="mb-2 mt-12" color="gray" size="100">
      <v-icon icon="mdi-account-circle" size="100"></v-icon>
    </v-avatar>
    <div class="text-3xl mb-8">{{ store.User.name }}</div>
    <v-btn class="mb-4" prepend-icon="mdi-human-handsup" @click="router.push({ name: 'Profile' })">Изменить мой профиль</v-btn>
    <v-btn class="mb-4" prepend-icon="mdi-human-handsup" @click="router.push({ name: 'UserReport' })">Отправить отчёт об ошибке</v-btn>

    <div class="mt-8">
      <div style="list-style: circle;">
        <div style="margin-left: 30px; padding-left:10px;">
          <RouterLink class="cursor-pointer linkDocs" v-if="store.isMobile" to="/privacy">Политика конфиденциальности</RouterLink>
          <RouterLink class="cursor-pointer linkDocs" v-if="!store.isMobile" to="/privacy-web">Политика конфиденциальности</RouterLink>
        </div>
        <div style="margin-left: 30px; padding-left:10px; margin-top: 10px; text-decoration: dashed;">
          <RouterLink class="cursor-pointer linkDocs" to="/terms">Пользовательское соглашение и Политика обработки персональных данных</RouterLink>
        </div>
      </div>
    </div>

    <!-- <div class="mt-20">
      <a class="text-lg underline" target="_blank" href="https://play.google.com/store/apps/details?id=">Оценить приложение</a>
    </div> -->
    <div class="mt-5">
      <div class="cursor-pointer text-center text-lg underline" @click="logout()" href="#">Выйти из приложения</div>
      <div class="cursor-pointer text-center mt-3 text-lg underline" @click="RemoveAccount()" href="#">Удалить аккаунт</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import { ArrowLeftCircleIcon, XCircleIcon } from '@icons/24/solid'
import Profile from '@/components/Profile.vue';
import Header from '@/components/Header.vue';
import Auth from '@/models/Auth';

const store = storeFile(), router = useRouter(), route = useRoute();

// Иконки

// Состояние компонента
const state = reactive({
  test: 5
})

onMounted(() => {

})

const logout = () => {
  if (confirm("ВЫ УВЕРЕНЫ, ЧТО ХОТИТЕ ВЫЙТИ?")) {
    Auth.Logout(router).then(r => {
      router.push("/welcome")
    })
  }
}

const RemoveAccount = () => {
  if (confirm("АККАУНТ БУДЕТ УДАЛЁН НАВСЕГДА ВМЕСТЕ СО ВСЕМИ ДАННЫМИ. ЭТО ДЕЙСТВИЕ НЕЛЬЗЯ ОТМЕНИТЬ. ВЫ УВЕРЕНЫ?")) {
    Auth.RemoveAccount(router)
  }
}

</script>

<style scoped lang="scss">
.bg-container {
  background: linear-gradient(180deg, #7986E6 .95%, #D7CAF4 25%, #D7CAF4 100%);
  position: absolute;
  inset: 0;
}

.linkDocs {
  text-decoration: none;
  border-bottom: 1px dotted gray;
}
</style>
