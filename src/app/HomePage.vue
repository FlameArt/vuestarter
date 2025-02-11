<template lang="pug">
.flex.justify-center.h-screen.items-center.flex-col
  .px-8.py-6.mt-4.text-left.bg-white.shadow-lg(class="desktop:w-feed-lg")
    | Welcome!

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { appStore } from "@/app/app"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'

// Глобальное хранилище и роуты
const store = storeFile(), app = appStore(), router = useRouter(), route = useRoute();

// Входящие данные компонента
const props = defineProps<{
  data?: any
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  data: {}
})

</script>

<style scoped lang="scss"></style>
