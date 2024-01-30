<template lang="pug">

//ArrowLeftCircleIcon.float-right.w-8.h-8.fill-slate-400(@click="router.push({name: 'MySettings'})" style="z-index: 9999;position: absolute;" v-show="route.name !== 'MySettings'")

.bg-container
// Каталог медитаций
div.px-3.pt-5
  Header(file="white" v-if="route.name === 'MySettings'")

RouterView.px-3
.px-3.pt-5.w-full.z-50


div.absolute.inset-0.fc.flex-col.flex-start.px-3(v-show="route.name === 'MySettings'")
  v-avatar.mb-2.mt-12(color="gray"  size="100")
    v-icon(icon="mdi-account-circle" size="100" )
  div.text-3xl.mb-8 {{ store.User.name }}
  v-btn.mb-4(prepend-icon="mdi-human-handsup"  @click="router.push({name: 'Profile'})") Изменить мой профиль
  v-btn.mb-4(prepend-icon="mdi-human-handsup"  @click="router.push({name: 'UserReport'})") Отправить отчёт об ошибке

  div.mt-8
    div(style="list-style: circle;")
      div(style="margin-left: 30px; padding-left:10px; ")
        RouterLink.cursor-pointer.linkDocs(v-if="store.isMobile" to="/privacy") Политика конфиденциальности
        RouterLink.cursor-pointer.linkDocs(v-if="!store.isMobile" to="/privacy-web") Политика конфиденциальности
      div(style="margin-left: 30px; padding-left:10px; margin-top: 10px; text-decoration: dashed;")
        RouterLink.cursor-pointer.linkDocs(to="/terms") Пользовательское соглашение и Политика обработки персональных данных


  //div.mt-20
    a.text-lg.underline(target="_blank" href="https://play.google.com/store/apps/details?id=") Оценить приложение
  div.mt-5
    div.cursor-pointer.text-center.text-lg.underline(@click="logout()" href="#") Выйти из приложения
    div.cursor-pointer.text-center.mt-3.text-lg.underline(@click="RemoveAccount()" href="#") Удалить аккаунт

</template>

<script setup lang="ts">
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import { ArrowLeftCircleIcon, XCircleIcon } from '@icons/24/solid'
import Profile from '@/components/Profile.vue';
import Header from '@/components/Header.vue';
import Auth from '../../models/Auth';

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
