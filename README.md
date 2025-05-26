# 🚀 Лев - Frontend Developer Portfolio

Сучасне портфоліо frontend розробника з плавним скролом та елегантною навігацією.

## ✨ Особливості

- 🎨 **Сучасний дизайн** - Темна тема з елегантними анімаціями
- 📱 **Повністю адаптивний** - Відмінно працює на всіх пристроях
- ⚡ **Швидкий та легкий** - Без зайвих залежностей
- 🎯 **Smooth scroll навігація** - Плавні переходи між секціями
- 🔝 **Scroll to top** - Зручна кнопка повернення наверх
- 🎭 **Інтерактивний** - Анімації при скролі та hover ефекти

## 🛠 Технології

- **HTML5** - Семантична розмітка
- **CSS3** - Grid, Flexbox, анімації, градієнти  
- **Vanilla JavaScript** - ES6+, класи, модулі
- **Responsive Design** - Mobile-first підхід

## 📂 Структура проекту

```
lev-portfolio/
├── index.html              # Головна сторінка
├── katevr-case.html        # Case study проекту KateVR
├── css/
│   ├── main.css           # Основні стилі та layout
│   ├── components.css     # Компоненти (картки, кнопки)
│   └── responsive.css     # Медіа-запити та адаптивність
├── js/
│   ├── main.js           # Навігація та scroll detection
│   └── scroll.js         # Scroll to top та додаткові функції
└── README.md             # Документація проекту
```

## 🎮 Функціональність

### Навігація
- **Фіксована ліва панель** з анімованим логотипом "Л" → "Лев"
- **Активна секція** автоматично підсвічується при скролі
- **Smooth scroll** до потрібної секції при кліку
- **Компактна версія** на мобільних (точки замість тексту)

### Scroll Features
- **Scroll to Top** кнопка з'являється після 300px скролу
- **Throttled scroll events** для оптимальної производительності
- **Intersection Observer** для анімацій (опціонально)
- **Smooth scroll polyfill** для старих браузерів

### Case Study

- **Детальний** розбір проекту KateVR з технічними подробицями
- **Прогрес-бар** для відстеження прочитання
- **Копіювання коду** з прикладів
- **Анімовані лічильники** та поява елементів

## 🚀 Швидкий старт

### Локальна розробка

1. **Клонуйте репозиторій**
   ```bash
   git clone https://github.com/username/lev-portfolio.git
   cd lev-portfolio
   ```

2. **Запустіть локальний сервер**
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # Live Server (VS Code)
   # Встановіть розширення Live Server і клікніть "Go Live"
   ```

3. **Відкрийте браузер**
   ```
   http://localhost:8000
   ```

## 🌐 Деплой

### GitHub Pages (Безкоштовно)

1. **Завантажте на GitHub**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

2. **Увімкніть GitHub Pages**
   - Перейдіть в Settings → Pages
   - Виберіть Source: Deploy from branch
   - Branch: main / (root)
   - Збережіть

3. **Ваш сайт буде доступний за адресою:**
   ```
   https://username.github.io/lev-portfolio
   ```

### Netlify / Vercel (Безкоштовно)

1. Перетягніть папку проекту на [netlify.com](https://netlify.com) або [vercel.com](https://vercel.com)
2. Отримайте автоматичний URL
3. Можна підключити власний домен

## 🎨 Кастомізація

### Зміна кольорів
Відредагуйте змінні в `css/main.css`:
```css
/* Основні кольори */
.highlight { color: #60a5fa; }
.code-text { color: #60a5fa; }
/* Градієнти кнопок */
background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
```

### Додавання секцій
1. Додайте нову секцію в `index.html`
2. Додайте відповідний пункт в навігацію
3. Стилі підхопляться автоматично

### Налаштування анімацій
Змініть тривалість та ефекти в `css/components.css`:
```css
.value-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## ⚙️ JavaScript API

### Основна навігація
```javascript
// Доступ до інстансу навігації
window.portfolioNav.scrollToSection('contact');
window.portfolioNav.getCurrentSection();
```

### Scroll to Top
```javascript
// Доступ до кнопки scroll to top
window.scrollToTop.show();
window.scrollToTop.hide();
window.scrollToTop.setThreshold(500); // Змінити поріг появи
```

### Додаткові функції
```javascript
// Увімкнути прогрес-бар (розкоментуйте в scroll.js)
window.scrollProgress = new ScrollProgress();

// Анімації при скролі
window.scrollAnimations = new ScrollAnimations();
```

## 📈 Performance

- ⚡ **Швидке завантаження** - Мінімум зовнішніх залежностей
- 🎯 **SEO оптимізація** - Правильні meta теги та семантика
- 📱 **Mobile-first** - Оптимізовано для мобільних
- 🔧 **Throttled events** - Оптимізовані scroll listeners
- 🎭 **Intersection Observer** - Ефективні анімації

## 🤝 Контакти

- **Email:** infinitystackdeveloper@gmail.com
- **Локація:** Київ, Україна
- **Статус:** 🚀 Активно шукаю роботу

## 📄 Ліцензія

MIT License. Можете вільно використовувати для своїх проектів.

---

**Створено з ❤️ в Україні 🇺🇦**