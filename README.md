# TechOne UI ⚡️

<img src="https://img.shields.io/badge/version-1.01.2-blue.svg" alt="Version">
<img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">

Библиотека современных UI компонентов на чистом HTML, CSS и JavaScript. Без зависимостей, легкая и производительная.
Сгенерирована с применением нейросетей.

## ✨ Особенности

- 🎯 **100% чистый код** - HTML, CSS, JavaScript без фреймворков
- 📦 **60+ компонентов** - все необходимые элементы интерфейса
- 🎨 **Темная тема** - встроенная поддержка тем
- 📱 **Адаптивность** - работает на всех устройствах
- ⚡ **Производительность** - минимальный размер, никаких зависимостей
- 🔧 **Гибкость** - каждый компонент можно использовать отдельно

## 📦 Установка
```html
    <!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://raw.githubusercontent.com/ll1ness/TechOne-UI/refs/heads/com.techone.build/techon-ui.min.js">
</head>
<!-- остальной код -->
```

### 🚀 Быстрый старт
```html

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://raw.githubusercontent.com/ll1ness/TechOne-UI/refs/heads/com.techone.build/techon-ui.min.js">
</head>
<body>
    <!-- Кнопка -->
    <button class="to-button" data-variant="primary">Нажми меня</button>
    
    <!-- Аккордеон -->
    <div class="to-accordion" data-open="true">
        <div class="to-accordion-header">
            <button class="to-accordion-trigger">
                <span>Заголовок</span>
                <span class="to-accordion-icon">▼</span>
            </button>
        </div>
        <div class="to-accordion-content">
            <div class="to-accordion-content-inner">
                Содержимое аккордеона
            </div>
        </div>
    </div>
    
    <!-- Бейдж -->
    <span class="to-badge" data-variant="success">Успех</span>
    
    <script src="https://raw.githubusercontent.com/ll1ness/TechOne-UI/refs/heads/com.techone.build/techon-ui.min.js"></script>
</body>
</html>
```
### 🎯 Использование

#### Автоматическая загрузка
```javascript
// Просто подключите скрипт - он сам найдет и инициализирует компоненты
// Технология MutationObserver автоматически обработает динамически 
```

#### Ручная загрузка
```javascript

// Загрузить конкретный компонент
TechOnUI.load('button').then(() => {
    console.log('Кнопки загружены');
});

// Загрузить все компоненты
TechOnUI.loadAll();

// Просканировать и загрузить только нужные
TechOnUI.scan();
```
#### Настройка путей
```javascript

// Если файлы компонентов лежат в другой папке
TechOnUI.setBasePath('/assets/techon/');

// Включить отладку
TechOnUI.enableDebug();
```

### 🎨 Темизация
##### Светлая тема (по умолчанию)
```html

<body data-theme="light">
    <!-- компоненты будут в светлой теме -->
</body>
```
##### Тёмная тема
```html

<body data-theme="dark">
    <!-- компоненты будут в тёмной теме -->
</body>
```
##### Переключение темы
```javascript

// Программно
document.body.setAttribute('data-theme', 'dark');

// Использовать компонент ThemeSwitcher
<div class="to-theme-switcher" data-type="buttons"></div>
// или
<div class="to-theme-switcher" data-type="dropdown"></div>
```
#### ⚙️ API
##### Глобальный объект
```javascript

// Доступ через TechOnUI или to
TechOnUI.load('button');
to.load('button');

// Версия
console.log(TechOnUI.version); // "1.0.0"
```
#### Методы API

| Метод | Описание | Пример |
|-------|----------|--------|
| `load(componentName)` | Загрузить компонент | `TechOnUI.load('accordion')` |
| `loadAll()` | Загрузить все компоненты | `TechOnUI.loadAll()` |
| `scan()` | Найти и загрузить используемые компоненты | `TechOnUI.scan()` |
| `setBasePath(path)` | Установить базовый путь для файлов | `TechOnUI.setBasePath('/ui/')` |
| `enableDebug()` | Включить режим отладки | `TechOnUI.enableDebug()` |

##### События
```javascript

// Слушать загрузку компонента
document.addEventListener('DOMContentLoaded', () => {
    console.log('TechOn UI готов');
});

// Кастомные события компонентов
document.querySelector('.to-dropdown').addEventListener('dropdown-select', (e) => {
    console.log('Выбрано:', e.detail.value);
});
```

#### 📦 Структура проекта
```text

techon-ui/
├── accordeon/
├── accordion-group/
├── animation/
├── arrow/
├── auto-scroll/
├── avatar/
├── avatar-group/
├── background/
├── badge/
├── banner/
├── blockquote/
├── breadcrumps/
├── button/
├── card/
├── carousel/
├── compareimage/
├── contextmenu/
├── cursorcard/
├── dialog/
├── dropdown/
├── dropdownwrapper/
├── elementtype/
├── emojipicker/
├── fade/
├── feedback/
├── flex/
├── grid/
├── heading/
├── hover/
├── hovercard/
├── icon/
├── iconbutton/
├── inlinecode/
├── kbd/
├── line/
├── list/
├── logo/
├── logocloud/
├── mask/
├── masonrygrid/
├── media/
├── navicon/
├── ogcard/
├── option/
├── particle/
├── progressbar/
├── pulse/
├── README.md
├── scroller/
├── scrolltotop/
├── segmentedcontrol/
├── skeleton/
├── smartlink/
├── spinner/
├── statusindicator/
├── table/
├── tag/
├── text/
├── themeswitcher/
├── timeline/
├── toast/
├── togglebutton/
├── tooltip/
├── techon-ui.min.css
└── techon-ui.min.js
```
#### 🌟 Примеры
##### Форма входа с темной темой
```html

<div data-theme="dark" style="padding: 40px;">
    <div class="to-card" style="max-width: 400px; margin: 0 auto;">
        <div class="to-card-header">
            <h2 class="to-card-title">Вход</h2>
        </div>
        <div class="to-card-content">
            <input type="email" placeholder="Email" style="width: 100%; padding: 10px; margin-bottom: 16px; border: 1px solid var(--to-border); border-radius: var(--to-radius);">
            <input type="password" placeholder="Пароль" style="width: 100%; padding: 10px; margin-bottom: 24px; border: 1px solid var(--to-border); border-radius: var(--to-radius);">
            <button class="to-button" data-variant="primary" data-fill-width="true">Войти</button>
        </div>
    </div>
</div>
```
##### Дашборд с карточками
```html

<div class="to-grid" data-columns="3" data-gap="m">
    <div class="to-card" data-variant="elevated">
        <div class="to-card-header">
            <h3 class="to-card-title">Пользователи</h3>
            <span class="to-badge" data-variant="info">+12%</span>
        </div>
        <div class="to-card-content">
            <div style="font-size: 32px; font-weight: bold;">1,234</div>
        </div>
    </div>
    
    <div class="to-card" data-variant="elevated">
        <div class="to-card-header">
            <h3 class="to-card-title">Заказы</h3>
            <span class="to-badge" data-variant="success">+5%</span>
        </div>
        <div class="to-card-content">
            <div style="font-size: 32px; font-weight: bold;">567</div>
        </div>
    </div>
    
    <div class="to-card" data-variant="elevated">
        <div class="to-card-header">
            <h3 class="to-card-title">Доход</h3>
            <span class="to-badge" data-variant="warning">-2%</span>
        </div>
        <div class="to-card-content">
            <div style="font-size: 32px; font-weight: bold;">$12.3K</div>
        </div>
    </div>
</div>
```
#### 🛠 Разработка
```bash

# Клонировать репозиторий
git clone https://github.com/techon-ui/techon-ui.git

# Установить зависимости (для сборки)
npm install

# Собрать проект
npm run build

# Запустить dev сервер
npm run dev
```
#### 🤝 Участие в разработке

Мы приветствуем любой вклад в проект!

    Форкните репозиторий

    Создайте ветку для фичи (git checkout -b feature/amazing-feature)

    Закоммитьте изменения (git commit -m 'Add amazing feature')

    Запушьте в ветку (git push origin feature/amazing-feature)

    Откройте Pull Request

👥 Contributors

Благодарим всех, кто contributed в проект:

    DeepSeek - deepseek.com - Архитектура компонентов, оптимизация кода

    ll1ness - github.com/ll1ness - Дизайн система, темизация

    Lorant One - lorant.one - Документация, примеры использования

📄 Лицензия

MIT © TechOn UI. Полный текст лицензии доступен в файле LICENSE.
🌟 Поддержка

    Поставьте звезду на GitHub ⭐

    Расскажите о проекте друзьям

    Используйте в своих проектах

    Создавайте issue с багами и идеями

📞 Контакты

    GitHub: github.com/techon-ui

    Twitter: @techon_ui

    Email: team@techon.dev

###### Сделано с ❤️ для сообщества разработчиков.

- ll1ness
