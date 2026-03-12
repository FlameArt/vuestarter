# Документация Flamerest (REST API Client)

`flamerest` — это библиотека для взаимодействия с REST API, интегрированная в проект. Она предоставляет глобальный объект `REST` для выполнения запросов и базовые классы для работы с моделями данных каждой таблицы (CRUD), а также доступ к другим ендпоинтам: `SiteController`, `/core/v1/CoreController` итд.

## Глобальный объект REST

В проекте глобально доступна переменная `REST` (класс `FLAMEREST`). Она уже сконфигурирована (URL сервера, токены авторизации) и готова к использованию.

```typescript
// Пример прямого обращения (обычно не требуется, если используются модели)
const response = await REST.request('/api/v1/some/endpoint', { key: 'value' }, 'POST');
```

---

## Работа с моделями таблиц (CRUD)

В папке `models/generated/` находятся автоматически сгенерированные классы для каждой таблицы базы данных (например, `GeneratedAffiliates.ts`). Эти классы предоставляют типизированный интерфейс для операций Create, Read, Update, Delete.

В папке `models/` находятся расширения этих классов (например, `Affiliates.ts`), где можно добавлять кастомную логику. **Использовать в коде нужно именно их.**

### 1. Получение данных (Read)

#### Получение списка (`all`)
Статический метод `all` используется для выборки списка записей с фильтрацией и пагинацией.

**Использование:**
```typescript
import Affiliates from '@/models/Affiliates';

// Простой запрос
const result = await Affiliates.all();
console.log(result.data); // Массив объектов Affiliates

// Запрос с параметрами
const complexResult = await Affiliates.all({
    where: {
        user: 15,                 // Равно
        paymethod: ['LIKE', 'US'] // SQL LIKE
    },
    sort: ['-id'],                // Сортировка (минус — по убыванию)
    page: 1,                      // Номер страницы
    perPage: 20,                  // Записей на страницу
    fields: ['id', 'postback_uri'] // Выбрать только конкретные поля
});

console.log(complexResult.pages.total); // Общее количество записей
```

**Подробное описание параметров where:**

Параметр `where` поддерживает различные типы условий фильтрации:

```typescript
// Обычные значения
{ user: 15, paymethod: 'paypal' }

// Операторы сравнения
{
    id: ['>=', 'id', 100],           // id >= 100
    paymethod: ['LIKE', 'US'],       // LIKE '%US%'
    paynumber_part: ['NOT LIKE', '****'], // NOT LIKE '%****%'
    user: ['IN', 'user', [1, 2, 3]], // IN (1, 2, 3)
    id: ['BETWEEN', 'id', [10, 50]] // BETWEEN 10 AND 50
}

// Полнотекстовый поиск (только для индексированных полей)
{ description: ['FULLTEXT', 'description', 'поисковый запрос'] }

// Поиск в JSON полях (массив значений)
{
    tags: ['JSONIN', ['tag1', 'tag2']], // JSON_OVERLAPS
    categories: ['category1', 'category2']  // JSON_CONTAINS для каждого значения
}

// Для связанных таблиц указывайте имя таблицы
{
    'users.name': 'John',           // поле из связанной таблицы
    'users.email': ['LIKE', 'gmail.com']
}
```

**Подробное описание expand полей (extfields):**

Параметр `extfields` позволяет загружать связанные данные из других таблиц. Указывается либо индекс связи, либо название foreign key поля:

```typescript
// По индексу связи (из массива related полей модели)
const result = await Affiliates.all({
    extfields: [0, 1], // Загрузить связанные данные по индексам 0 и 1
});

// По названию foreign key поля
const result = await Affiliates.all({
    extfields: {
        user: ['name', 'email'],    // Загрузить name и email из таблицы users
        paymethod: '*'             // Загрузить все поля из связанной таблицы
    }
});

// Комбинированный вариант
const result = await Affiliates.all({
    extfields: {
        user: ['name', 'email'],    // По foreign key
        0: ['title', 'description'] // По индексу
    }
});
```

**Формат ответа:**
```typescript
// Тип: Rows<Affiliates>
{
    type: "json",
    status: 200,
    ok: true,
    data: [ // Массив объектов Affiliates
        { id: 1, user: 101, postback_uri: "...", paymethod: "paypal", ... },
        { id: 2, user: 102, postback_uri: "...", paymethod: "webmoney", ... }
    ],
    errors: undefined,
    message: undefined,
    pages: { // Информация о пагинации
        page: 1,     // Текущая страница
        perPage: 20, // Записей на странице
        count: 5,    // Всего страниц
        total: 95    // Всего записей в БД
    }
}
```

#### Получение одной записи (`one`)
Статический метод `one` возвращает один экземпляр модели или `null`.

**Использование:**
```typescript
// По ID
const item = await Affiliates.one(123);

// По условию
const itemByCondition = await Affiliates.one({ paymethod: 'paypal' });

if (item) {
    console.log(item.postback_uri);
}
```

**Формат ответа:**
```typescript
// Тип: Affiliates | null
// При успехе: объект Affiliates
{
    id: 123,
    user: 101,
    postback_uri: "https://example.com/postback",
    paymethod: "paypal",
    paynumber_full: "123456789",
    paynumber_part: "****6789"
}

// При отсутствии записи: null
```

### 2. Создание и Редактирование (Create / Update)

Метод `save()` автоматически определяет, нужно создать новую запись или обновить существующую, основываясь на наличии Primary Key.

#### Создание новой записи
**Использование:**
```typescript
const newAffiliate = new Affiliates();
newAffiliate.user = 101;
newAffiliate.postback_uri = 'https://example.com/postback';
newAffiliate.paymethod = 'webmoney';

// Отправляет POST запрос на создание
const result = await newAffiliate.save();

if (result.ok) {
    console.log('Создано с ID:', result.data.id);
}
```

**Формат ответа:**
```typescript
// Тип: SavedObject<Affiliates>
{
    type: "json",
    status: 201,
    ok: true,
    data: { // Созданный объект с присвоенным ID
        id: 456, // Новый ID, присвоенный базой данных
        user: 101,
        postback_uri: 'https://example.com/postback',
        paymethod: 'webmoney',
        paynumber_full: null,
        paynumber_part: null
    },
    errors: undefined,
    message: undefined
}
```

#### Редактирование существующей
**Использование:**
```typescript
const affiliate = await Affiliates.one(123);

if (affiliate) {
    affiliate.postback_uri = 'https://new-url.com';

    // Отправляет запрос на обновление
    const result = await affiliate.save();
}
```

**Формат ответа:**
```typescript
// Тип: SavedObject<Affiliates>
{
    type: "json",
    status: 200,
    ok: true,
    data: { // Обновленный объект
        id: 123,
        user: 101,
        postback_uri: 'https://new-url.com', // Обновленное поле
        paymethod: 'webmoney',
        paynumber_full: null,
        paynumber_part: null
    },
    errors: undefined,
    message: undefined
}
```

### 3. Удаление (Delete)

**Использование:**
```typescript
// Вариант 1: Удаление экземпляра
const affiliate = await Affiliates.one(123);
await affiliate.delete();

// Вариант 2: Статическое удаление по ID
await Affiliates.delete(123);
```

**Формат ответа:**
```typescript
// Тип: boolean | BaseResponse<any>

// При успехе: true
true

// При ошибке: объект с описанием ошибки
{
    type: "json",
    status: 404,
    ok: false,
    data: undefined,
    errors: { message: "Запись не найдена" },
    message: "Не удалось удалить запись"
}
```

---

## Загрузка файлов и `REST.prepare`

Для отправки файлов (изображений, документов) необходимо использовать метод `REST.prepare`. Он преобразует данные в `FormData`, корректно обрабатывая массивы файлов и обычные поля.

Это критически важно, так как стандартный `JSON.stringify` не может сериализовать объекты `File` или `FileList`.

### Как это работает

Перед отправкой данных (например, при сохранении формы), если среди полей есть файлы, нужно прогнать объект через `prepare`.

Аргументы `REST.prepare(values, asFormData)`:
*   `values`: Объект с данными (ключ-значение).
*   `asFormData`: `true`, если нужно вернуть объект `FormData` для отправки на сервер (обычно так и делается при загрузке файлов).

### Пример использования (из FlameTable)

```typescript
// Пример из логики сохранения таблицы
public async save() {
    // 1. Собираем данные формы
    const rawData = {
        name: 'My Item',
        description: 'Some text',
        avatar: this.selectedFile, // Это может быть FileList или File
        gallery: this.fileArray    // Массив файлов
    };

    // 2. Подготавливаем данные
    // Вторым аргументом передаем true, чтобы получить FormData
    const preparedData = await REST.prepare(rawData, true);

    // 3. Отправляем через модель или напрямую
    // Библиотека сама выставит Content-Type: multipart/form-data, если увидит FormData
    const result = await MyModel.edit(this.id, preparedData);
    
    return result;
}
```

### Особенности `REST.prepare`
1.  **Input Files**: Автоматически извлекает файлы из `HTMLInputElement`, `FileList`, `Event` (Drop/Paste).
2.  **Массивы**: Если поле содержит массив файлов, они будут добавлены в FormData с ключом `fieldname[]`.
3.  **JSON поле**: Все остальные (не файловые) поля сериализуются в JSON-строку и кладутся в поле `json` внутри FormData. Сервер автоматически распарсит это поле.

---

## Другие эндпоинты

Помимо CRUD операций с таблицами, доступны специализированные эндпоинты для различных функций:

### PayController (`/pay/`)

Эндпоинты для работы с платежами:

#### Получение ссылки на оплату (`POST /pay/getlink`)
```typescript
const result = await REST.request('/pay/getlink', {
    paymethod: 'paypal',
    amount: 100,
    currency: 'USD'
}, 'POST');
```

#### Получение курсов валют (`GET /pay/getrates`)
```typescript
const result = await REST.request('/pay/getrates', {}, 'GET');
```

#### Создание PayPal заказа (`POST /pay/createpaypalorder`)
```typescript
const result = await REST.request('/pay/createpaypalorder', {
    amount: 50,
    currency: 'USD'
}, 'POST');
```

### Core Controller (`/core/v1/`)

Прокси-контроллеры для взаимодействия с C# бекендом:

#### Примеры

##### Обычный запрос 

Допустим есть ендпоинт `/core/v1/geo/`, тогда запрос просто с его параметрами:

**Синхронизация стран (`POST /core/v1/geo/sync-country`)**
```typescript
const result = await REST.request('/core/v1/geo/sync-country', {
    country_id: 1,
    wordpress_data: {...}
}, 'POST');
```

##### ПРИМЕР С ЗАГРУЗКОЙ ФАЙЛОВ 

Допустим есть ендпоинт `/core/v1/import/`

**Импорт Wordstat данных (`POST /core/v1/import/wordstat`)**
```typescript
// Используется для загрузки CSV файлов
// Отправляется как multipart/form-data через REST.prepare
const preparedData = await REST.prepare({
    file: fileInput.files[0], // CSV файл
    city_id: 123
}, true);

const result = await REST.request('/core/v1/import/wordstat', preparedData, 'POST');
```

---

## Прямые запросы (REST.request)

Если нужно обратиться к кастомному методу API, которого нет в стандартном CRUD.

```typescript
/**
 * request(url, params, method, responseType, isNeedToken)
 */
const response = await REST.request(
    '/api/v1/custom/action', 
    { someParam: 123 }, 
    'POST' // или 'GET', 'PUT', 'DELETE'
);

if (response.ok) {
    // Обработка успеха
} else {
    // Обработка ошибок (валидация и т.д.)
    console.error(response.errors);
}
```
