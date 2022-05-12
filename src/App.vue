<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { storeFile } from "@/store.js";
import { useRoute, useRouter } from "vue-router";
import REST from "flamerest";

const store = storeFile();
const router = useRouter(),
  route = useRoute();

let notRedirectOnAuthList = [
  "Auth",
  "Signup",
  "ResetPasswordRequest",
  "ResetPassword",
];

onMounted(() => {
  REST.auth().then((res) => {
    store.User = res.data.User;
    store.User.isLoaded = true;
    if (res.data.isAuthorized === false) {
      if (!notRedirectOnAuthList.includes(route.name)) {
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
</style>
