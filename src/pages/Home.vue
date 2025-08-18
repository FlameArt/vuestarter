<template>
  <v-layout>
    <!-- Левый блок навигации с пользователем -->
    <v-navigation-drawer v-if="Auth.isAuthorized()" v-model="state.drawer" expand-on-hover
      :permanent="store.platformType === 'Desktop'">

      <!-- Иконка пользователя сверху -->
      <div class="py-3 px-4 user-block">
        <div class="d-flex align-center justify-space-between w-full">
          <!-- Левая часть: иконка + имя -->
          <div class="d-flex align-center">
            <v-menu location="bottom">
              <template v-slot:activator="{ props }">
                <div class="d-flex align-center cursor-pointer" v-bind="props">
                  <v-avatar size="32" color="primary" class="mr-3">
                    <v-icon size="16" color="white">mdi-account</v-icon>
                  </v-avatar>

                  <!-- Имя пользователя или email (ограничено 20 символами) -->
                  <div class="text-sm text-gray-600"
                    style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    {{ truncatedUserName }}
                  </div>
                </div>
              </template>
              <v-list>
                <v-list-item @click="router.push('/settings')">
                  <v-list-item-title>Настройки</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>Выйти</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <!-- Правая часть: иконка сворачивания (только на десктопе) -->
          <div v-if="$vuetify.display.mdAndUp">
            <v-btn icon size="small" variant="text" @click="state.drawer = !state.drawer">
              <v-icon>{{ state.drawer ? 'mdi-chevron-left' : 'mdi-chevron-right' }}</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Вертикальная полоса под разделом с пользователем -->
      <div></div>

      <!-- Существующая навигация -->

      <v-divider></v-divider>

      <v-list-item :to="{ name: 'AffiliateDashboard' }" prepend-icon='mdi-account-multiple-plus' title='Мои партнёры'
        value='affiliate' />
      <v-list-item :to="{ name: 'Billing' }" prepend-icon='mdi-credit-card-outline' title='Оплаты' value='pays' />
      <v-divider></v-divider>
      <v-list-item :to="'/settings'" prepend-icon='mdi-cog' title='Настройки' value='settings' />
    </v-navigation-drawer>

    <v-main v-if="state.isAuthNeeded()" :class="store.platform === 'ios' ? ' mt-[20px] ' : ''">
      <div v-if="state.isAuthorized()" class="desktop:desktopwidth mobile:mobilewidth desktop:mx-auto">
        <!-- Хедер в main -->
        <div class="d-flex justify-space-between align-center py-3 px-4 bg-white mb-4 main-header">
          <Header :drawer="state.drawer" @update:drawer="newValue => state.drawer = newValue"></Header>
        </div>

        <router-view></router-view>
      </div>
      <div v-else>
        <Signup>
        </Signup>
      </div>
    </v-main>

  </v-layout>

</template>

<script setup lang="ts">

// Основные импорты
import { onMounted, reactive, computed } from '@vue/runtime-core'; import { storeFile } from "@/store"; import { settingsFile } from '@/settings'; import { useRoute, useRouter } from 'vue-router'; import REST from "flamerest"
import Signup from './user/Signup.vue';
import Header from '@/components/Header.vue';
import Auth from '@/models/Auth';

// Иконки
import { XCircleIcon } from '@icons/24/solid'

const store = storeFile(), router = useRouter(), route = useRoute();

// Состояние компонента
const state = reactive({
  drawer: store.platformType === 'Desktop',
  menu: [
    {}
  ],

  isAuthNeeded: () => store.User.isLoaded || !settingsFile().authRequired,
  isAuthorized: () => settingsFile().authRequired && Auth.isAuthorized() || !settingsFile().authRequired,

})

// Вычисляемое свойство для отображения имени пользователя или email
const userDisplayName = computed(() => {
  if (store.User.name && store.User.name.trim() !== '') {
    return store.User.name;
  }
  return store.User.email || 'Пользователь';
});

// Вычисляемое свойство для отображения обрезанного имени (максимум 20 символов)
const truncatedUserName = computed(() => {
  const name = userDisplayName.value;
  if (name.length > 20) {
    return name.substring(0, 20) + '...';
  }
  return name;
});

// Функция выхода
const logout = () => {
  Auth.Logout(router);
}

onMounted(() => {
  if (route.path === '/') {

  }
});

useHead({
  title: 'Hello World',
  titleTemplate: '%s %separator My App',
})






function useHead(arg0: { title: string; titleTemplate: string; }) {
  throw new Error('Function not implemented.');
}
</script>

<style scoped lang="scss">
/* Фиксированная высота для блоков хедера и пользователя */
.header-block {
  height: 64px;
  display: flex;
  align-items: center;
}

/* Обеспечиваем одинаковую высоту для всех элементов */
.user-block,
.main-header {
  height: 64px;
  display: flex;
  align-items: center;
}

/* Нижние линии для блоков */
.user-block+div {
  height: 1px;
  background-color: var(--color-border);
  margin: 0 16px;
}

.main-header {
  border-bottom: 1px solid var(--color-border) !important;
}
</style>
