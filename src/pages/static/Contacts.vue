<template lang="pug">
div
  h1.text-2xl Контакты
  .my-5 Если у вас возникли вопросы, или предложения
  div.font-bold.mt-5 Вы можете связаться с нами по почте &nbsp;
    a.text-blue-600(:href="'mailto:'+settingsFile().legal.ContactEmail ") {{ settingsFile().legal.ContactEmail  }}
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineProps, defineEmits, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import { settingsFile } from '@/settings';

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

<style scoped lang="scss"></style>
