<template lang="pug">

div(class=" desktop:p-3 desktop:w-full ")
  h1.text-xl.font-bold.text-gray-500.text-center Подписки пользователей

  .rounded-xl.bg-white.p-6.mt-2(class="desktop:w-full")
    Table(ref="TableComponent" :opts = "opts" :model="Model")

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import Model from '@models/Usersubscribtions';
import TableOpts from 'flameresttable/src/Table/TableOpts'
import Table from 'flameresttable/src/Table/Table.vue'

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

const TableComponent = ref<InstanceType<typeof Table>>();

const opts = new TableOpts;
opts.Add.can = true;
opts.Remove.can = true;

opts.set("user", { title: 'Пользователь', Popup: {} });
opts.set("subscription", { title: 'Подписка', Table: { isShow: true }, Popup: { isShow: true, isEnabled: true } });
opts.set("started_dt", { title: "Начало подписки", Table: { isShow: true }, Popup: { isShow: true, popupType: 'date' } });
opts.set("payedto_dt", { title: "Подписан до", Table: { isShow: true }, Popup: { isShow: true, popupType: 'date' } });
opts.delete("status");
opts.delete("id");

// Загружаем первичные данные
Model.all({ sort: ['id'] }).then(r =>
  TableComponent.value?.Table.load(r)
)

</script>

<style scoped lang="scss"></style>
