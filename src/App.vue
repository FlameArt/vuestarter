<script setup lang="ts">
import { onMounted, reactive } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Auth from './models/Auth';
import { settingsFile } from './settings';
const store = storeFile(), router = useRouter(), route = useRoute();

onMounted(() => {
});

</script>

<template>
  <v-app>
    <router-view v-if="!settingsFile().authRequired || store.User.isLoaded" />
  </v-app>
</template>

<style>
#app {
  font-family: "Roboto", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Цвет стандартного фона модального окна */
.vue-universal-modal {
  background-color: rgba(0, 0, 0, 0.15) !important;
}
</style>
