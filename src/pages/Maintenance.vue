<template>
  <div class="maintenance-page">
    <!-- Анимированный фон -->
    <div class="maintenance-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="maintenance-container">
      <!-- Иконка и заголовок -->
      <div class="maintenance-header">
        <div class="maintenance-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
            <path d="M19 15L19.5 16.5L21 17L19.5 17.5L19 19L18.5 17.5L17 17L18.5 16.5L19 15Z" fill="currentColor"/>
            <path d="M5 15L5.5 16.5L7 17L5.5 17.5L5 19L4.5 17.5L3 17L4.5 16.5L5 15Z" fill="currentColor"/>
          </svg>
        </div>
        <h1 class="maintenance-title">🛠️ Сервер на обслуживании</h1>
        <p class="maintenance-subtitle">Мы проводим технические работы для улучшения сервиса</p>
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="maintenanceMessage" class="maintenance-message">
        <div class="message-card">
          <h3>📢 Дополнительная информация</h3>
          <p>{{ maintenanceMessage }}</p>
        </div>
      </div>

      <!-- Информационные карточки -->
      <div class="maintenance-info">
        <div class="info-card">
          <div class="info-icon">⏱️</div>
          <h3>Время ожидания</h3>
          <p>Обычно обслуживание занимает от 15 минут до 2 часов</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon">🔄</div>
          <h3>Автоматическое обновление</h3>
          <p>Страница будет автоматически проверять доступность сервера</p>
        </div>
        
        <div class="info-card">
          <div class="info-icon">📧</div>
          <h3>Уведомления</h3>
          <p>Мы уведомим вас, когда сервис снова будет доступен</p>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="maintenance-actions">
        <button @click="refreshPage" class="action-button primary">
          <span class="button-icon">🔄</span>
          Обновить страницу
        </button>
        
        <button @click="goHome" class="action-button secondary">
          <span class="button-icon">🏠</span>
          На главную
        </button>
      </div>

      <!-- Прогресс-бар -->
      <div class="maintenance-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressWidth + '%' }"></div>
        </div>
        <p class="progress-text">Проверка доступности сервера...</p>
      </div>

      <!-- Контактная информация -->
      <div class="maintenance-contact">
        <p>Если у вас есть срочные вопросы, свяжитесь с нами:</p>
        <div class="contact-links">
          <a href="mailto:support@example.com" class="contact-link">
            <span class="contact-icon">📧</span>
            support@example.com
          </a>
          <a href="tel:+1234567890" class="contact-link">
            <span class="contact-icon">📞</span>
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { navigate } from 'vike/client/router'

// Состояние компонента
const maintenanceMessage = ref<string>('')
const progressWidth = ref(0)
let progressInterval: number | null = null
let checkInterval: number | null = null

// Получаем сообщение об ошибке из localStorage
onMounted(() => {
  const message = localStorage.getItem('maintenance_message')
  if (message) {
    maintenanceMessage.value = message
    localStorage.removeItem('maintenance_message') // Очищаем после получения
  }
  
  // Запускаем анимацию прогресс-бара
  startProgressAnimation()
  
  // Запускаем периодическую проверку сервера
  startServerCheck()
})

onUnmounted(() => {
  // Очищаем интервалы при размонтировании компонента
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (checkInterval) {
    clearInterval(checkInterval)
  }
})

// Анимация прогресс-бара
const startProgressAnimation = () => {
  progressInterval = setInterval(() => {
    progressWidth.value = (progressWidth.value + 1) % 101
  }, 100)
}

// Периодическая проверка сервера
const startServerCheck = () => {
  checkInterval = setInterval(async () => {
    try {
      // Пытаемся сделать простой запрос к серверу
      const response = await fetch('/api/v1/health', { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        // Сервер снова доступен - перенаправляем на главную
        navigate('/')
      }
    } catch (error) {
      // Сервер всё ещё недоступен - продолжаем ждать
      console.log('Сервер всё ещё недоступен')
    }
  }, 30000) // Проверяем каждые 30 секунд
}

// Обновить страницу
const refreshPage = () => {
  window.location.reload()
}

// Перейти на главную
const goHome = () => {
  navigate('/')
}
</script>

<style scoped>
.maintenance-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Анимированный фон */
.maintenance-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 10%;
  right: 30%;
  animation-delay: 1s;
}

.shape-5 {
  width: 40px;
  height: 40px;
  top: 40%;
  left: 60%;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Основной контейнер */
.maintenance-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

/* Заголовок */
.maintenance-header {
  margin-bottom: 40px;
}

.maintenance-icon {
  color: #667eea;
  margin-bottom: 20px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.maintenance-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.maintenance-subtitle {
  font-size: 1.2rem;
  color: #718096;
  margin: 0;
}

/* Сообщение об ошибке */
.maintenance-message {
  margin-bottom: 30px;
}

.message-card {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
}

.message-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
}

.message-card p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
}

/* Информационные карточки */
.maintenance-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.info-icon {
  font-size: 2rem;
  margin-bottom: 15px;
  display: block;
}

.info-card h3 {
  font-size: 1.2rem;
  color: #2d3748;
  margin: 0 0 10px 0;
}

.info-card p {
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Кнопки действий */
.maintenance-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-button.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.action-button.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.action-button.secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.button-icon {
  font-size: 1.1rem;
}

/* Прогресс-бар */
.maintenance-progress {
  margin-bottom: 30px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #718096;
  font-size: 0.9rem;
  margin: 0;
}

/* Контактная информация */
.maintenance-contact {
  border-top: 1px solid #e2e8f0;
  padding-top: 30px;
}

.maintenance-contact p {
  color: #718096;
  margin-bottom: 15px;
}

.contact-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #764ba2;
}

.contact-icon {
  font-size: 1.1rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .maintenance-container {
    padding: 30px 20px;
    margin: 20px;
  }
  
  .maintenance-title {
    font-size: 2rem;
  }
  
  .maintenance-info {
    grid-template-columns: 1fr;
  }
  
  .maintenance-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .contact-links {
    flex-direction: column;
    align-items: center;
  }
}
</style> 