<template>
  <div class="sales-screen-container">
    <div class="content">
      <!-- Сюда можно добавить изображение продукта -->
      <!-- img.product-image(:src="product.imageUrl") -->

      <h1 class="title">{{ product.title }}</h1>
      <p class="description">{{ product.description }}</p>

      <div class="price">{{ product.price }}</div>
    </div>

    <div class="purchase-footer">
      <v-btn
        class="purchase-button"
        :loading="state.isLoading"
        :disabled="state.isLoading"
        @click="purchase"
        color="primary"
        size="large"
      >
        {{ t('Купить') }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import Pays from '@/models/Pays';
import { Capacitor } from '@capacitor/core';

// Локали
const { t } = useI18n({ inheritLocale: true, useScope: 'local' });

// Определяем интерфейс для пропсов
interface Product {
  id: number | string;
  title: string;
  description: string;
  price: string;
  appleProductId: string;
  googleProductId: string;
  // imageUrl?: string; // Опционально для изображения
}

// Входящие данные компонента
const props = defineProps<{
  product: Product;
}>();

// Локальное состояние
const state = reactive({
  isLoading: false,
});

const purchase = async () => {
  state.isLoading = true;
  try {
    // Определяем, какой ID продукта использовать
    const platform = Capacitor.getPlatform();
    const productId = platform === 'ios' ? props.product.appleProductId : props.product.googleProductId;

    if (!productId) {
        alert('ID продукта не определен для данной платформы.');
        state.isLoading = false;
        return;
    }

    // TODO: Здесь будет вызов обновленной функции Pays.PayMobile
    console.log(`Инициирована покупка для продукта: ${productId}`);
    const result = await Pays.PayMobile(productId);
    alert('Покупка успешно совершена! ID заказа: ' + result.orderId);

  } catch (error: any) {
    // Обработка ошибок, которые вернет обновленный PayMobile
    if (error === 'cancelled') {
      alert('Вы отменили покупку.');
    } else {
      alert(`Произошла ошибка: ${error.message || 'Неизвестная ошибка'}`);
    }
  } finally {
    state.isLoading = false;
  }
};
</script>

<style scoped lang="scss">
.sales-screen-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #6a75d7 0%, #a291c9 100%);
  color: white;
  text-align: center;
  padding: 2rem;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  max-width: 400px;
  margin-bottom: 2rem;
}

.price {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.purchase-footer {
  // Эта часть будет внизу экрана
  padding-bottom: 2rem; // Отступ для системных навигационных элементов
}

.purchase-button {
  width: 100%;
  max-width: 350px;
  border-radius: 16px;
  text-transform: none;
  font-size: 1.2rem;
}
</style>

<i18n>
{
  "en": {
    "Купить": "Buy Now"
  },  
  "ru": {
    "Купить": "Купить"
  }
}
</i18n>
