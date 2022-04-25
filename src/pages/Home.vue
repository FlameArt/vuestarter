<template lang="pug">
.flex.justify-center.h-screen.items-center.flex-col
  .px-8.py-6.mt-4.text-left.bg-white.shadow-lg(class="lg:w-[725px]")
    | Welcome!

</template>

<script setup>

import { onMounted } from "@vue/runtime-core";
import { storeFile } from "/src/store";
import { useRoute, useRouter } from "vue-router";
import REST from "flamerest"

const store = storeFile(), router = useRouter(), route = useRoute();

onMounted(() => {

});


</script>

<style scoped lang="scss">
</style>
