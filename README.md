# TechOne UI

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Матричная библиотека UI‑компонентов** на чистом HTML, CSS и JavaScript. Тёмная тема по умолчанию, AI‑фон, готовые к использованию компоненты для быстрой разработки современных веб‑интерфейсов.

## 📋 Оглавление

- [✨ Особенности](#-особенности)
- [📦 Установка](#-установка)
- [🚀 Быстрый старт](#-быстрый-старт)
- [🧩 Доступные компоненты](#-доступные-компоненты)
- [📁 Структура проекта](#-структура-проекта)
- [🎨 Кастомизация](#-кастомизация)
- [📱 Адаптивность](#-адаптивность)
- [📖 Документация](#-документация)
- [🤝 Вклад в проект](#-вклад-в-проект)
- [📄 Лицензия](#-лицензия)

## ✨ Особенности

- **Чистый стек** — только HTML, CSS и JavaScript без зависимостей
- **Тёмная тема по умолчанию** — современный дизайн с контрастными цветами
- **AI‑фон** — уникальные анимированные градиентные фоны
- **Полная адаптивность** — mobile‑first подход, работает на всех устройствах
- **Доступность (a11y)** — ARIA‑атрибуты, семантическая разметка, keyboard navigation
- **Модульная архитектура** — каждый компонент независим и самодостаточен
- **Производительность** — минимальный размер, оптимизированный CSS/JS
- **Готовые примеры** — демо‑страницы для каждого компонента

## 📦 Установка

### Клонирование репозитория

```bash
git clone https://github.com/ll1ness/techone-ui.git
cd techone-ui
```

### Запуск локального сервера

```bash
# Использование Python 3
python3 -m http.server 8080

# Или использование Node.js (npx)
npx serve .

# Или любой другой локальный сервер
```

Откройте `http://localhost:8080` в браузере.

## 🚀 Быстрый старт

### Базовый шаблон

```html
<!DOCTYPE html>
<html lang="ru" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Мой проект</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Ваш контент -->
  
  <script src="build/techon-ui.min.js"></script>
</body>
</html>
```

### Подключение отдельных компонентов

```html
<!-- Кнопка -->
<button class="btn btn--primary">Основная кнопка</button>

<!-- Карточка -->
<div class="card">
  <div class="card__header">Заголовок карточки</div>
  <div class="card__body">
    Содержимое карточки
  </div>
</div>

<!-- Сетка -->
<div class="grid grid--3">
  <div class="grid__item">Элемент 1</div>
  <div class="grid__item">Элемент 2</div>
  <div class="grid__item">Элемент 3</div>
</div>
```

## 🧩 Доступные компоненты

| Компонент | Описание | Состояние |
|-----------|----------|-----------|
| [Accordion](src/components/accordion/) | Сворачиваемые панели | ✅ Готов |
| [Avatar](src/components/avatar/) | Аватар пользователя | ✅ Готов |
| [Badge](src/components/badge/) | Бейджи и метки | ✅ Готов |
| [Banner](src/components/banner/) | Информационные баннеры | ✅ Готов |
| [Breadcrumbs](src/components/breadcrumbs/) | Навигационная хлебная крошка | ✅ Готов |
| [Button](src/components/button/) | Кнопки различных стилей | ✅ Готов |
| [Card](src/components/card/) | Карточки для контента | ✅ Готов |
| [Dialog](src/components/dialog/) | Модальные окна | ✅ Готов |
| [Dropdown](src/components/dropdown/) | Выпадающие списки | ✅ Готов |
| [Flex](src/components/flex/) | Flexbox контейнеры | ✅ Готов |
| [Grid](src/components/grid/) | CSS Grid сетки | ✅ Готов |
| [Icon](src/components/icon/) | Иконки (встроенные SVG) | ✅ Готов |
| [Icon Button](src/components/icon-button/) | Кнопки-иконки | ✅ Готов |
| [Progress](src/components/progress/) | Индикаторы прогресса | ✅ Готов |
| [Pulse](src/components/pulse/) | Анимация пульсации | ✅ Готов |
| [Scroll Top](src/components/scroll-top/) | Кнопка прокрутки вверх | ✅ Готов |
| [Skeleton](src/components/skeleton/) | Skeleton‑загрузчики | ✅ Готов |
| [Spinner](src/components/spinner/) | Спиннеры загрузки | ✅ Готов |
| [Status Indicator](src/components/status-indicator/) | Индикаторы статуса | ✅ Готов |
| [Table](src/components/table/) | Таблицы данных | ✅ Готов |
| [Tag](src/components/tag/) | Теги и метки | ✅ Готов |
| [Theme](src/components/theme/) | Переключатель темы | ✅ Готов |
| [Timeline](src/components/timeline/) | Линейки времени | ✅ Готов |
| [Toggle Button](src/components/toggle-button/) | Переключатели | ✅ Готов |
| [Tooltip](src/components/tooltip/) | Всплывающие подсказки | ✅ Готов |

## 📁 Структура проекта

```
techone-ui/
├── index.html              # Главная страница с демо всех компонентов
├── main.js                 # Основной JavaScript (навигация, скролл)
├── styles.css              # Основной CSS (переменные, сброс, базовые стили)
├── favicon.ico             # Иконка сайта
├── build/
│   └── techon-ui.min.js    # Минифицированный JS (библиотека компонентов)
├── src/
│   └── components/         # Исходные компоненты
│       ├── accordion/
│       ├── avatar/
│       ├── badge/
│       ├── banner/
│       ├── breadcrumbs/
│       ├── button/
│       ├── card/
│       ├── dialog/
│       ├── dropdown/
│       ├── flex/
│       ├── grid/
│       ├── icon/
│       ├── icon-button/
│       ├── progress/
│       ├── pulse/
│       ├── scroll-top/
│       ├── skeleton/
│       ├── spinner/
│       ├── status-indicator/
│       ├── table/
│       ├── tag/
│       ├── theme/
│       ├── timeline/
│       ├── toggle-button/
│       └── tooltip/
├── examples/               # Примеры использования
├── vault/
│   └── RESPONSIVE_TESTING.md  # Документация по тестированию
└── README.md               # Этот файл
```

## 🎨 Кастомизация

### CSS переменные

TechOn UI использует CSS‑переменные для кастомизации темы:

```css
:root {
  /* Цвета */
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  
  /* Фон */
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-tertiary: #1a1a24;
  
  /* Текст */
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  
  /* Градиенты */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  
  /* Отступы */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Радиусы */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;
  
  /* Тени */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Анимации */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}
```

### Смена темы

Используйте атрибут `data-theme` на элементе `<html>`:

```html
<html data-theme="dark">  <!-- тёмная тема (по умолчанию) -->
<html data-theme="light"> <!-- светлая тема -->
```

## 📱 Адаптивность

Все компоненты спроектированы с mobile‑first подходом:

- **Mobile (< 768px)** — оптимизировано для смартфонов
- **Tablet (768px – 1024px)** — планшеты
- **Desktop (> 1024px)** — десктопы

Используйте utility‑классы для управления отображением:

```html
<!-- Скрыть на мобильных -->
<div class="hidden-mobile">Только для десктопа</div>

<!-- Скрыть на десктопе -->
<div class="hidden-desktop">Только для мобильных</div>

<!-- Гибкая сетка -->
<div class="grid grid--2-mobile grid--3-tablet grid--4-desktop">
  ...
</div>
```

## 📖 Документация

### Основная документация

- **[Responsive Testing](vault/RESPONSIVE_TESTING.md)** — руководство по тестированию адаптивности
- **[Component Examples](examples/)** — практические примеры использования

### Онлайн‑демо

Откройте `index.html` в браузере после запуска локального сервера, чтобы увидеть все компоненты в действии.

## 🤝 Вклад в проект

Мы открыты для contributions! Вот как можно помочь:

1. **Fork репозитория**
2. **Создайте ветку** для новой фичи: `git checkout -b feature/amazing-feature`
3. **Зафиксируйте изменения**: `git commit -m 'Add amazing feature'`
4. **Отправьте в ветку**: `git push origin feature/amazing-feature`
5. **Откройте Pull Request**

### Стандарты кода

- Используйте 2 пробела для отступов
- Следуйте BEM‑методологии для CSS
- Пишите семантический HTML
- Добавляйте ARIA‑атрибуты для доступности
- Комментируйте сложные участки кода

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробности смотрите в файле [LICENSE](LICENSE).

---

<div align="center">
  <strong>TechOne UI</strong> — создано с ❤️ для разработчиков<br>
  <a href="https://github.com/ll1ness/techone-ui">GitHub</a> • 
  <a href="https://ll1ness.github.io/TechOne-UI/">Демо</a>
</div>