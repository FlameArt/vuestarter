<template lang="pug">

div(class=" desktop:p-3 desktop:w-full ")
  h1.text-xl.font-bold.text-gray-500.text-center Юзеры сайта

  .rounded-xl.bg-white.p-6.mt-2(class="desktop:w-full")
    Table(ref="TableComponent" :opts = "opts" :model="Model")

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import Model from '@models/User';
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
opts.Add.can = false;
opts.Remove.can = false;

opts.set("id", { title: 'ID', Popup: { isEnabled: false } });
opts.set("name", { title: 'Выводимое имя', Popup: {} });
opts.set("desc", { title: 'Описание', Popup: {} });
opts.set("username", { title: 'Никнейм', Table: { isShow: false }, Popup: { isShow: true, isEnabled: false } });
opts.set("email", { title: 'Емеил', Table: { isShow: true }, Popup: { isShow: true } });
opts.set("phone", { title: 'Телефон', Table: { isShow: true }, Popup: { isShow: true } });
opts.set("created_at", {
  title: 'Регистрация', Table: {
    isShow: true, value: (row, column) => {
      return new Date(parseInt(row[column.name]) * 1000).toISOString().replaceAll("T", " ")
    },
  }, Popup: { isShow: true }
});
opts.delete(["auth_key", "password_hash", "password_reset_token", "avatar", "status", "updated_at", "verification_token"]);
opts.delete("user_hash");
opts.delete("id");
opts.delete("phone");
opts.delete("install_uuid");
opts.delete("license_key");

// Загружаем первичные данные
Model.all({ sort: ['id'] }).then(r =>
  TableComponent.value?.Table.load(r)
)

</script>

<style scoped lang="scss"></style>
