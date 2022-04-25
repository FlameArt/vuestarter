<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import { storeFile } from "/src/store.js";
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
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
