# <img src="https://raw.githubusercontent.com/ll1ness/techone-ui/main/techone-logo.png" width="48" alt="TechOne UI Logo" /> TechOne UI

<p align="center">
  <strong>матричная библиотека UI‑компонентов</strong><br>
  Чистый HTML • CSS • JavaScript • Без зависимостей
</p>

<p align="center">
  <a href="https://github.com/ll1ness/techone-ui">
    <img src="https://img.shields.io/badge/GitHub-ll1ness-333?style=flat-square&logo=github" alt="GitHub">
  </a>
  <a href="https://github.com/ll1ness/techone-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-6366f1?style=flat-square" alt="MIT">
  </a>
  <img src="https://img.shields.io/badge/Status-Beta-f59e0b?style=flat-square" alt="Beta">
  <img src="https://img.shields.io/badge/Components-24-10b981?style=flat-square" alt="24 Components">
</p>

---

## ⚡ Что это?

TechOne UI — это **матричная** библиотека UI‑компонентов для тех, кто ценит:

- ✅ **Простоту** — один `.js` файл, и всё работает
- ✅ **Скорость** — без фреймворков, сборщиков и зависимостей
- ✅ **Стиль** — тёмная тема по умолчанию с AI‑анимациями
- ✅ **Качество** — 24 готовых компонента для production

> Подумайте: Tailwind для базовых задач? Не теперь. TechOne UI — это ваш путь к быстрому прототипированию без боли.

---

## ✨ Возможности

| | | |
|--------------------------|--------------------------|--------------------------|
| 🌑 **Тёмная тема** | 🎨 **AI‑фон** | 📱 **Mobile‑first** |
| ♿ **Accessibility** | ⚡ **Zero deps** | 🔧 **Кастомизация** |
| 📦 **24 компонента** | 🎯 **Production ready** | 🌐 **Кроссбраузерность** |

---

## 🚀 Быстрый старт

### Установка

```bash
git clone https://github.com/ll1ness/techone-ui.git
cd techone-ui
```

### Запуск

```bash
python3 -m http.server 8080
# или
npx serve .
```

Откройте → **`http://localhost:8080`**

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
  
  <button class="to-button" data-variant="primary">
    Нажми меня
  </button>

  <script src="build/techon-ui.min.js"></script>
</body>
</html>
```

---

## 🧩 Компоненты

### Базовые
| Компонент | Описание |
|-----------|----------|
| [Button](src/components/button/) | Кнопки с вариантами |
| [Icon Button](src/components/icon-button/) | Кнопки‑иконки |
| [Tag](src/components/tag/) | Теги и метки |
| [Badge](src/components/badge/) | Бейджи |
| [Avatar](src/components/avatar/) | Аватары |

### Структура
| Компонент | Описание |
|-----------|----------|
| [Card](src/components/card/) | Карточки контента |
| [Grid](src/components/grid/) | CSS Grid сетки |
| [Flex](src/components/flex/) | Flexbox контейнеры |
| [Banner](src/components/banner/) | Информационные баннеры |
| [Breadcrumbs](src/components/breadcrumbs/) | Хлебные крошки |

### Интерактивные
| Компонент | Описание |
|-----------|----------|
| [Accordion](src/components/accordion/) | Сворачиваемые панели |
| [Dialog](src/components/dialog/) | Модальные окна |
| [Dropdown](src/components/dropdown/) | Выпадающие списки |
| [Tooltip](src/components/tooltip/) | Всплывающие подсказки |
| [Toggle Button](src/components/toggle-button/) | Переключатели |

### Состояния
| Компонент | Описание |
|-----------|----------|
| [Spinner](src/components/spinner/) | Спиннеры загрузки |
| [Skeleton](src/components/skeleton/) | Skeleton‑загрузчики |
| [Progress](src/components/progress/) | Индикаторы прогресса |
| [Status Indicator](src/components/status-indicator/) | Индикаторы статуса |
| [Pulse](src/components/pulse/) | Пульсация |

### Утилиты
| Компонент | Описание |
|-----------|----------|
| [Timeline](src/components/timeline/) | Временная линейка |
| [Table](src/components/table/) | Таблицы данных |
| [Scroll Top](src/components/scroll-top/) | Кнопка наверх |
| [Icon](src/components/icon/) | Встроенные SVG |

---

## 🎨 Кастомизация

### CSS переменные

```css
:root {
  --to-primary: #6366f1;
  --to-bg: #0a0a0f;
  --to-text: #ffffff;
  --to-border: #27272a;
}
```

### Переключение темы

```html
<html data-theme="dark">   <!-- тёмная (по умолчанию) -->
<html data-theme="light">  <!-- светлая -->
```

---

## 📁 Структура проекта

```
techone-ui/
├── index.html              # Демо всех компонентов
├── main.js                # Навигация, скролл, утилиты
├── styles.css             # Базовые стили
├── build/
│   └── techon-ui.min.js   # Минифицированная библиотека
├── src/
│   └── components/       # 24 компонента
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
└── vault/                 # Документация
```

---

## 🤝 Contributing

```bash
# 1. Fork → 2. Clone → 3. Branch → 4. Code → 5. PR
git checkout -b feature/amazing-component
git commit -m 'Add amazing component'
git push origin feature/amazing-component
```

### Стандарты
- 2 пробела для отступов
- BEM для CSS классов
- Семантический HTML
- ARIA для accessibility

---

## 📄 Лицензия

[MIT](LICENSE) © 2026 ll1ness

---

<p align="center">
  <strong>TechOne UI</strong> — кодь с стилем 🔥
</p>

<p align="center">
  <a href="https://github.com/ll1ness/techone-ui">GitHub</a> •
  <a href="https://ll1ness.github.io/TechOne-UI/">Live Demo</a>
</p>
