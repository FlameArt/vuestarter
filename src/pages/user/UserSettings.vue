<template lang="pug">
</template>

<script setup>
import { onMounted, reactive } from "@vue/runtime-core"; import { storeFile } from "@/store"; import { useRoute, useRouter } from "vue-router"; import REST from "flamerest"
import { XCircleIcon } from '@heroicons/vue/solid'

const store = storeFile(), router = useRouter(), route = useRoute();

// Иконки

// Состояние компонента
const state = reactive({
  test: 5
})

onMounted(()=>{

})

</script>

<style scoped lang="scss">

</style>
