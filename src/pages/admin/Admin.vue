<template lang="pug">
.admin-panel.flex-col.p-4.w-full
  .buttons.flex.space-x-4
      .button.mb-3(@click="router.push({name: 'AdminUsers'})") Пользователи
    .button.mb-3(@click="router.push({name: 'AdminSubscriptions'})") Подписки
    .button.mb-3(@click="router.push({name: 'AdminUsersOrders'})") Заказы
    .button.mb-3(@click="router.push({name: 'AdminUserSubscriptions'})") Подписки пользователей
    .mt-3
    router-view
    
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import Header from '@/components/Header.vue';

// Глобальное хранилище и роуты
const store = storeFile(), router = useRouter(), route = useRoute();

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

<style scoped lang="scss">
.bg-container {
  background: linear-gradient(180deg, #FFCAC3 8.95%, #FFCAE5 100%);
  position: absolute;
  inset: 0;
}
</style>
