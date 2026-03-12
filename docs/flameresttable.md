# Документация по компоненту Table

Этот документ описывает, как использовать Vue-компонент `Table` для создания мощных и настраиваемых таблиц с поддержкой REST API на базе библиотеки `flamerest`.

## Содержание
- [Документация по компоненту Table](#документация-по-компоненту-table)
  - [Содержание](#содержание)
  - [Установка и настройка](#установка-и-настройка)
  - [Props компонента](#props-компонента)
  - [Конфигурация (TableOpts)](#конфигурация-tableopts)
  - [Методы конфигурации (TableOpts)](#методы-конфигурации-tableopts)
    - [set(columnName, options)](#setcolumnname-options)
    - [delete(columnName)](#deletecolumnname)
    - [addVirtual(columnName, options)](#addvirtualcolumnname-options)
  - [Подробная конфигурация колонок (IColumn)](#подробная-конфигурация-колонок-icolumn)
    - [`Table`: Настройки отображения в таблице](#table-настройки-отображения-в-таблице)
    - [`Filter`: Настройки фильтра](#filter-настройки-фильтра)
    - [`Popup`: Настройки поля в форме добавления/редактирования](#popup-настройки-поля-в-форме-добавленияредактирования)
    - [`Selector`: Настройки для связанных данных](#selector-настройки-для-связанных-данных)
  - [Методы компонента (через ref)](#методы-компонента-через-ref)
    - [Основные методы](#основные-методы)
    - [Свойства состояния](#свойства-состояния)
  - [Слоты (с примерами)](#слоты-с-примерами)
    - [`#defaultButtons` и `#otherButtons`](#defaultbuttons-и-otherbuttons)
    - [`#CustomRow`](#customrow)
    - [`#RowSubSlot`](#rowsubslot)
    - [Другие слоты](#другие-слоты)
  - [Реальный пример использования](#реальный-пример-использования)

## Установка и настройка
Для использования компонента, импортируйте компонент и его утилиты в вашем Vue-файле.

```vue
<template>
  <Table
    :model="Model"
    :opts="opts"
    ref="postsTable"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Model from '@/models/Houses'; // тут указание на модель конкретной REST-таблицы, а имя всегда Model
import Table from 'flameresttable/src/Table/Table.vue';
import TableOpts from 'flameresttable/src/Table/TableOpts';

const postsTable = ref<InstanceType<typeof Table>>();

const opts = new TableOpts();
// ... дальнейшая настройка объекта opts
</script>
```

## Props компонента

- **model** `*` (Class) — Класс модели данных, унаследованный от `REST.Model` из пакета `flamerest`.
- **opts** (TableOpts, default: `new TableOpts()`) — Объект с настройками таблицы.

## Конфигурация (TableOpts)
Ключевые опции, которые задаются в экземпляре `TableOpts`.

- **displayMode**: `'table' | 'custom'` — Режим отображения. 'table' - стандартный, 'custom' - для полного контроля через слот `#CustomRow`.
- **rowSelectors**: `boolean` (default: `true`) — Показывать ли колонку с чекбоксами для выбора строк.
- **Add.can**, **Edit.can**, **Remove.can**: `boolean` — Включение/отключение кнопок управления.
- **Pagination.type**: `'scrollable' | 'pages'` — Тип пагинации: 'pages' - классическая, 'scrollable' - бесконечная прокрутка.
- **onRowClickOpenSlot**: `'popup' | 'rowspace' | 'none'` (default: `'rowspace'`) — Что происходит при клике на строку. 'rowspace' открывает под-слот, 'popup' открывает модальное окно редактирования, 'none' отключает стандартное поведение.
- **customDownloadHandler**: `Function` — Пользовательский обработчик для скачивания файлов экспорта.
- **onBeforeUpdate**: `Function` — Функция, выполняемая перед каждым запросом данных. Если вернет `false`, запрос не будет выполнен.

## Методы конфигурации (TableOpts)
Для динамического управления колонками в объекте `opts` есть несколько удобных методов.

### set(columnName, options)
`(string | string[], IColumn) => void`
Устанавливает или изменяет конфигурацию для одной или нескольких колонок. Новые опции сливаются с существующими.

```javascript
// Установить ширину для колонки 'id'
opts.set('id', { Table: { width: 100 } });

// Установить один и тот же заголовок для нескольких колонок
opts.set(['created_at', 'updated_at'], { Table: { title: 'Дата' } });
```

### delete(columnName)
`(string | string[]) => void`
"Мягко удаляет" колонку — скрывает ее из таблицы, фильтров и всплывающего окна, устанавливая соответствующие флаги `isShow: false`.

```javascript
// Скрыть системную колонку
opts.delete('internal_id');
```

### addVirtual(columnName, options)
`(string, IColumn) => void`
Добавляет "виртуальную" колонку. Эта колонка не запрашивается с сервера в основном запросе, но для нее можно настроить фильтры. Это полезно для создания сложных фильтров (например, по диапазону дат), которые на бэкенде обрабатываются как несколько разных полей.

```javascript
// Добавить виртуальный фильтр по диапазону дат
opts.addVirtual('date_range', {
  Filter: { isShow: true, type: 'daterange', title: 'Период создания' },
  Table: { isShow: false }, // саму колонку в таблице не показываем
  Popup: { isShow: false }
});
```

## Подробная конфигурация колонок (IColumn)
Опции для каждой колонки задаются через метод `opts.set('columnName', { ... })`.

- **title**: `string` — Глобальный заголовок для колонки, используется если не задан более специфичный.
- **isVirtual**: `boolean` (default: `false`) — Если `true`, колонка не будет запрашиваться с бэкенда в основном запросе.
- **isLoadToTable**: `boolean` (default: `true`) — Загружать ли это поле в основном запросе для отображения в таблице.
- **isLoadToPopup**: `boolean` (default: `true`) — Загружать ли это поле при открытии окна редактирования.

### `Table`: Настройки отображения в таблице
- **isShow**: `boolean` (default: `true`) — Показывать ли колонку.
- **title**: `string` — Заголовок столбца (переопределяет глобальный `title`).
- **value**: `(row, column) => string` — Функция для форматирования значения в ячейке.
- **isRawValue**: `boolean` (default: `false`) — Если `true`, результат `value` будет вставлен как HTML (**Осторожно, XSS!**).
- **click**: `(row, column) => void` — Обработчик клика по ячейке.
- **classes** / **classesHeader**: `string` — Дополнительные CSS классы для ячеек (`<td>`) и заголовка (`<th>`).
- **width**: `number` — Ширина колонки в пикселях.

### `Filter`: Настройки фильтра
- **isShow**: `boolean` (default: `true`) — Показывать ли фильтр.
- **type**: `"text" | "fixed" | "fulltext" | "number" | "date" | "daterange" | "selector"` (default: `'text'`) — Тип поля фильтра.
- **title**: `string` — Заголовок над полем фильтра.
- **selector**: Настройки для фильтра типа `selector`.
    - **multiselect**: `boolean` (default: `true`) — Разрешить множественный выбор.
    - **mode**: `'vertical' | 'horizontal'` (default: `'vertical'`) — Режим отображения.

### `Popup`: Настройки поля в форме добавления/редактирования
- **isShow**: `boolean` (default: `true`) — Показывать ли поле.
- **isEnabled**: `boolean` (default: `true`) — Доступно ли поле для редактирования.
- **title** / **desc** / **placeholder**: `string` — Заголовок, описание и плейсхолдер.
- **popupType**: `"string" | "text" | "button" | "date" | "selector" | "image" | "file"` (default: `'string'`) — Тип поля в форме.
- **isSendFromAdd** / **isSendFromEdit**: `boolean` (default: `true`) — Отправлять ли значение на бэкенд.

### `Selector`: Настройки для связанных данных
- **model**: `Class` — Модель для автоматической загрузки значений.
- **values**: `ITableSelectorItem[]` — Массив статичных значений (`[{ id: 'val', title: 'Label' }]`).
- **loader**: `Function` — Функция для ручной загрузки значений.
- **preload**: `boolean` (default: `true`) — Предзагружать ли значения селектора.

## Методы компонента (через ref)
Доступ через `ref`. Пример: `postsTable.value.Table.update()`.

### Основные методы
- **update(loadParams, exportFilename)** — Загружает или обновляет данные таблицы.
- **add()** — Открывает модальное окно для создания новой записи.
- **save()** — Сохраняет изменения в редактируемой записи.
- **remove(row)** — Удаляет указанную строку.
- **getSelectedRows()** — Возвращает массив выделенных строк.
- **exportToCSV(filename, rows)** — Экспорт в CSV на стороне клиента.
- **exportToXLS(onlySelected, filename, rows)** — Инициирует экспорт в XLSX на сервере.

### Свойства состояния
- **Rows**: `{ rows: Array<T> }` — Реактивный объект с данными.
- **Pager**: состояние пагинации (`page`, `perPage`, `total`).
- **loadingStatus**: `'process' | 'completed'` — Статус загрузки.
- **exportStatus**: `'exportprocess' | 'completed'` — Статус экспорта.

## Слоты (с примерами)

### `#defaultButtons` и `#otherButtons`
Для добавления кастомных кнопок.

```vue
<Table :opts="opts" ref="table">
    <template #otherButtons>
        <button @click="showSelected">Показать выбранных</button>
    </template>
</Table>
```

### `#CustomRow`
Полностью заменяет рендеринг строки (при `opts.displayMode = 'custom'`).
**Параметры:** `row`, `edit`, `remove`, `table`.

```vue
<!-- opts.displayMode = 'custom'; -->
<Table :opts="opts">
    <template #CustomRow="{ row, edit, remove }">
        <div class="my-card">
            <h5>{{ row.username }}</h5>
            <button @click="edit()">Edit</button>
        </div>
    </template>
</Table>
```

### `#RowSubSlot`
Отображает контент под строкой (при `opts.onRowClickOpenSlot = 'rowspace'`).
**Параметры:** `row`.

```vue
<!-- opts.onRowClickOpenSlot = 'rowspace'; -->
<Table :opts="opts">
    <template #RowSubSlot="{ row }">
        <div>Детали заказа №{{ row.id }}</div>
    </template>
</Table>
```

### Другие слоты
- `#TableHeaders`: полная замена заголовка таблицы.
- `#Row`: замена рендеринга одной строки в режиме 'table'.
- `#header`: контент в заголовке модального окна.

## Реальный пример использования

```javascript
// В <script setup>
import { ref } from 'vue';
import Model from '@/models/Userprojectsposts'; // импортируем модель как Model
import Table from 'flameresttable/src/Table/Table.vue';
import TableOpts from 'flameresttable/src/Table/TableOpts';

// 1. Инициализация
const postsTable = ref<InstanceType<typeof Table>>();
const opts = new TableOpts();

// 2. Настройка глобального поведения
opts.Add.can = false;
opts.Edit.can = false;
opts.Remove.can = true;
opts.lang = "ru";
opts.Pagination.type = 'scrollable';
opts.Export.isShow = false;
opts.rowSelectors = false; // Отключаем чекбоксы выбора

// 3. Пакетная настройка колонок
// Скрываем все фильтры по умолчанию, чтобы потом включить только нужные
Object.keys(new Model()).forEach(key => {
  opts.set(key, { Filter: { isShow: false } });
});

// 4. Точечная настройка нужных колонок и фильтров
opts.set("id", { 
  title: 'ID',
  Filter: { isShow: true, type: 'number' },
  Table: { width: 80 }
});

opts.set("status", { 
  title: 'Статус',
  Filter: { 
    isShow: true, 
    type: 'selector', 
    selector: { multiselect: true } 
  }, 
  Selector: {
    values: [ // Задаем статические значения для селектора
      { id: '0', title: 'Придуман' },
      { id: '1', title: 'Запощен' },
      { id: '2', title: 'Отменён' },
    ]
  }
});
```

```vue
<!-- В <template> -->
<Table 
    :model="Model" 
    :opts="opts" 
    ref="postsTable" 
/>
```

