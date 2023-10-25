<template lang="pug">

div(class=" desktop:p-3 desktop:w-full ")
  h1.text-xl.font-bold.text-gray-500.text-center ОПЛАТЫ

  .rounded-xl.bg-white.p-6.mt-2(class="desktop:w-full")
    Table(ref="TableComponent" :opts = "opts" :model="Model")

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from '@vue/runtime-core'; import type { Ref } from 'vue'; import { storeFile } from "@/store"; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"

// Иконки
import { } from '@icons/24/solid'
import Model from '@models/Userorders';
import TableOpts from 'flameresttable/src/Table/TableOpts'
import Table from 'flameresttable/src/Table/Table.vue'
import { Column } from 'flameresttable/src/Table/Columns';
import User from '@models/User';

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
opts.set("user", { title: 'Клиент', Popup: { popupType: 'selector', Selector: { loader: (col: Column) => [] } } });
opts.set("subscription", { title: 'Подписка', Table: { isShow: true }, Popup: { isShow: true, isEnabled: false } });
opts.set("total", { title: 'Сумма', Table: { isShow: true }, Popup: { isShow: true } });
opts.set("paysystem", { title: 'Биллинг', Table: { isShow: true }, Popup: { isShow: true } });
opts.set("transaction_id", { title: 'Транзакция', Table: { isShow: false }, Popup: { isShow: true } });
opts.set("transaction_data", { title: 'Данные транзакции', Table: { isShow: false }, Popup: { isShow: true } });
opts.set("status", { title: 'Статус', Table: { isShow: true }, Popup: { isShow: true, isEnabled: false } });
opts.set("created_dt", { title: 'Создана', Table: { isShow: true }, Popup: { isShow: true, isEnabled: false } });
opts.delete(["auth_key", "password_hash", "password_reset_token", "avatar", "status", "created_at", "updated_at", "verification_token"]);
opts.delete("affiliate");
opts.delete("data");
opts.delete("paymethod");
opts.delete("paystatus");
opts.delete("transaction_id");
opts.delete("updated_dt");

let Users = User.all({ perPage: 1000 }).then(r => {
  if (r.data === undefined) return;
  let all = r.data.map(x => { return { id: x.id, name: x.name, email: x.email } });
  opts.set("user", { title: 'Клиент', Popup: { popupType: 'selector', Selector: { loader: (col: Column) => all } } });
})

// Загружаем первичные данные
Model.all({ sort: ['id'] }).then(r =>
  TableComponent.value?.Table.load(r)
)

</script>

<style scoped lang="scss"></style>
