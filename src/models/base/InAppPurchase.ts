import { Capacitor } from '@capacitor/core';
import 'cordova-plugin-purchase';
import 'cordova-plugin-purchase/www/store.d';
import { storeFile } from '@/store';

class InAppPurchaseService {

  // DO NOT initialize to CdvPurchase.store here
  store?: CdvPurchase.Store;
  private readyPromise: Promise<void>;
  private resolveReady!: () => void;
  private purchasePromises: { [productId: string]: { resolve: (value: any) => void; reject: (reason?: any) => void; } } = {};

  /**
   * TODO: Замените на URL вашего сервера для валидации чеков.
   * Это крайне рекомендуется для обеспечения безопасности покупок.
   */
  // public validatorUrl = "https://validator.iaptic.com/v1/validate?appName=demo&apiKey=12345678";

  constructor() {
    this.readyPromise = new Promise(resolve => {
      this.resolveReady = resolve;
    });

    const initStore = () => {
      if (window.CdvPurchase && window.CdvPurchase.store) {
        console.log('Initializing CdvPurchase.store');
        this.store = CdvPurchase.store;
      } else {
        console.error('CdvPurchase.store is not available.');
      }
      this.resolveReady();
    };

    if (Capacitor.isNativePlatform()) {
      // На нативных платформах ждем событие 'deviceready'
      document.addEventListener('deviceready', initStore, false);
    } else {
      // В вебе плагины Cordova недоступны
      console.warn('CdvPurchase.store is not available on the web platform.');
      this.resolveReady();
    }
  }

  /**
   * Возвращает массив продуктов, загруженных из App Store / Google Play.
   * Используйте эти данные для отображения в UI.
   */
  public get products(): CdvPurchase.Product[] {
    return this.store?.products ?? [];
  }

  /**
   * Включает подробное логирование для отладки.
   */
  public enableDebugLogging() {
    if (this.store) {
      this.store.verbosity = CdvPurchase.LogLevel.DEBUG;
    }
  }

  /**
   * Возвращает промис, который разрешается, когда стор инициализирован.
   */
  public ready(): Promise<void> {
    return this.readyPromise;
  }

  /**
   * Инициализирует стор, регистрирует продукты и настраивает обработчики.
   * Этот метод должен быть вызван один раз при старте приложения.
   * @param products Список продуктов для регистрации в сторе.
   */
  public async initializeAndRegisterProducts(products: CdvPurchase.Product[]) {
    await this.ready();
    if (!this.store) {
      console.error("Store is not available, cannot initialize.");
      return;
    }

    // 2. Регистрация продуктов
    this.store.register(products);

    // 3. Настройка обработчиков событий
    this.store.when()
      .productUpdated(product => {
        console.log('Продукт обновлен:', product);
        // Здесь можно обновить UI, если нужно
      })
      .approved(transaction => {
        console.log('Покупка одобрена, начинаем верификацию:', transaction);
        transaction.verify();
      })
      .verified((receipt: CdvPurchase.VerifiedReceipt) => {
        console.log('Чек успешно верифицирован:', receipt);

        // Проверяем, есть ли ожидающий Promise для этой покупки
        receipt.collection.forEach(purchase => {
          if (this.purchasePromises[purchase.id]) {
            // Весь объект receipt является результатом валидации
            this.purchasePromises[purchase.id].resolve(receipt);
            this.removePurchasePromise(purchase.id);
          }
        });

        // Завершаем транзакцию, чтобы избежать повторных списаний
        receipt.finish();
        // Обновляем данные пользователя в приложении (балансы, подписки и т.д.)
        storeFile().update();
      })
      .unverified((unverifiedReceipt: CdvPurchase.UnverifiedReceipt) => {
        console.error('Верификация чека не удалась:', unverifiedReceipt);

        // Проверяем, есть ли ожидающий Promise для этой покупки
        unverifiedReceipt.receipt.transactions.forEach(tx => {
          tx.products.forEach(p => {
            if (this.purchasePromises[p.id]) {
              this.purchasePromises[p.id].reject(new Error('Verification failed'));
              this.removePurchasePromise(p.id);
            }
          });
        });

        // ВАЖНО: Не вызывайте finish() для неподтвержденных транзакций.
        // Система может попытаться проверить их снова позже.
        // Здесь можно показать пользователю сообщение о том, что покупка проверяется.
      });

    // Глобальный обработчик ошибок стора
    this.store.error(err => {
      console.error('Произошла общая ошибка в сторе:', err);
      // Глобальная ошибка, отклоняем все ожидающие Promises
      Object.keys(this.purchasePromises).forEach(productId => {
        this.purchasePromises[productId].reject(err);
        this.removePurchasePromise(productId);
      });
    });

    // 4. Инициализация стора. Этот вызов асинхронно получит информацию о продуктах.
    this.store.initialize();
  }

  /**
   * Инициирует покупку продукта по его ID.
   * @param productId ID продукта для покупки.
   */
  public async purchase(productId: string): Promise<void> {
    await this.ready();
    if (!this.store) {
      return Promise.reject("Store is not available.");
    }

    const product = this.store.get(productId);
    if (!product) {
      console.error(`Продукт с ID "${productId}" не найден.`);
      return Promise.reject(`Product not found: ${productId}`);
    }

    // Для подписок лучше использовать getOffer(), для остальных - order()
    const offer = product.getOffer();
    if (!offer) {
      console.error(`Для продукта "${productId}" не найдено предложения (Offer).`);
      return Promise.reject(`Offer not found for ${productId}`);
    }

    const orderResult = await offer.order();
    if (orderResult && orderResult.isError) {
      if (orderResult.code === CdvPurchase.ErrorCode.PAYMENT_CANCELLED) {
        console.log('Пользователь отменил оплату.');
        // Отклоняем Promise, если он был добавлен
        if (this.purchasePromises[productId]) {
          this.purchasePromises[productId].reject('cancelled');
          this.removePurchasePromise(productId);
        }
        return Promise.reject('cancelled');
      } else {
        console.error('Ошибка при покупке:', orderResult);
        if (this.purchasePromises[productId]) {
          this.purchasePromises[productId].reject(orderResult);
          this.removePurchasePromise(productId);
        }
        return Promise.reject(orderResult);
      }
    }
    // Успешное начало процесса покупки, дальнейшая обработка в .approved() и .verified()
    console.log('Процесс покупки успешно запущен.');
    // Promise будет разрешен в обработчиках verified/unverified
  }

  /**
   * Добавляет Promise в очередь ожидания результата покупки.
   * @internal Используется из Pays.ts
   */
  public addPurchasePromise(productId: string, resolve: (value: any) => void, reject: (reason?: any) => void) {
    this.purchasePromises[productId] = { resolve, reject };
  }

  /**
   * Удаляет Promise из очереди ожидания.
   * @internal Используется из Pays.ts и внутри сервиса
   */
  public removePurchasePromise(productId: string) {
    delete this.purchasePromises[productId];
  }


  /**
   * Проверяет, куплен ли уже данный продукт.
   * @param productId ID продукта для проверки.
   * @returns true, если продукт куплен, иначе false.
   */
  public isOwned(productId: string): boolean {
    if (!this.store) {
      return false;
    }
    return this.store.owned(productId);
  }

  /**
   * Восстанавливает ранее сделанные неконсигнационные покупки.
   * Это обязательное требование для публикации в App Store.
   */
  public async restorePurchases(): Promise<void> {
    await this.ready();
    if (!this.store) {
      console.error("Store is not available, cannot restore purchases.");
      return;
    }
    this.store.refresh();
  }
}

// Экспортируем синглтон-экземпляр
export const inAppPurchaseService = new InAppPurchaseService();
