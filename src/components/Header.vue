<template lang="pug">

.fb.w-full.relative.mt-2(style="z-index: 99999;")
  img.cursor-pointer.fill-black(src="/src/assets/logo.png" class="h-[25px] hover:opacity-50"  @click="router.push({name: 'Home'})")
  UserCircleIcon.w-4.h-4.fill-slate-400(class="hover:opacity-60")
  //img.cursor-pointer(@click="router.push({name:'MyMessages'})" :src="'/img/notification_'+props.file+'.svg'" class="hover:opacity-70").fill-slate-400.w-8.h-8

.mt-8

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { BellIcon, UserCircleIcon } from '@icons/24/solid'

// Глобальное хранилище и роуты
const store = storeFile(), router = useRouter(), route = useRoute();

// Входящие данные компонента
const props = defineProps<{
  file?: string
}>()
const emit = defineEmits(['test'])

// Локальное состояние компонента
const state = reactive({
  data: {}
})

</script>

<style scoped lang="scss"></style>
