<script setup lang="ts">
import { onMounted, reactive, defineProps } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
const store = storeFile(), router = useRouter(), route = useRoute();

let notRedirectOnAuthList = [
  "Auth",
  "Signup",
  "ResetPasswordRequest",
  "ResetPassword",
];

onMounted(() => {

  const token = localStorage.getItem("jwttoken");
  if (token !== null && token !== undefined)
    REST.token = token;

  REST.auth().then((res) => {
    store.authUser(res);
    store.User.isLoaded = true;
    if (res.isAuthorized === false) {
      if (!notRedirectOnAuthList.includes(route.name?.toString() ?? "")) {
        router.push({ name: "Auth" });
      }
    } else {
      // Load state
      // store.projects = REST.get("projects");
    }
  });
});
</script>

<template>
  <router-view v-if="store.User.isLoaded" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Цвет стандартного фона модального окна */
.vue-universal-modal {
  background-color: rgba(0, 0, 0, 0.15) !important;
}
</style>
