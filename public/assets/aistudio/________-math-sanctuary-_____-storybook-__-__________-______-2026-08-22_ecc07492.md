# Редизайн Math Sanctuary — стиль «Storybook на персиковой бумаге»

Полная замена текущей Material-темы (Scholarly Sanctuary) на flat storybook-стиль из design.md: персиковый холст, чёрные обводки 2px, пилюли 47px, чанковый слэб-серифный заголовок, крайоновые акценты. Без теней, без градиентов, без серых цветов.

## Дизайн-система

- Шрифты: Alfa Slab One (заголовки, только 400, не меньше 16px) + Manrope (UI/текст, 400/500/700/800). Подключение через Google Fonts.
- Токены цвета в `index.css` (HSL): peach-paper (канвас), ink (чёрный), snow, ember-orange, magenta-pop, sunbeam-yellow, mint-wash, powder-blue, lilac-tint, lime-zest, cobalt-spark.
- Семантические алиасы для shadcn: background = peach, foreground = ink, border = ink, card = snow.
- Радиусы: `pill` 47px (нав, кнопки, карточки), `sm` 10px для мелких вложенных элементов. Никаких 0/4px.
- Обводка: 2px solid ink на всех карточках/кнопках. Все box-shadow удаляются (включая текущие тени в Header, BottomNav, GameCard).
- Типо-шкала: caption 12, body 16, heading-sm 25, subheading 34, heading 46, heading-lg 50, display 120.
- Мин. тап-таргет 56px сохраняется.

## Декор

Набор inline-SVG дудлов в `shared/ui/doodles` на математическую тему (цифры, линейка, циркуль, звезда, плюс/минус, знак равенства, ракета) — тонкая чёрная обводка, разбросаны с разными поворотами на фоне за контентом, `pointer-events-none`.

## Экраны

**Home**
- Шапка: пилюля-логотип «MATH SANCTUARY» (белая, чёрная обводка) + XP-пилюля с жёлтой заливкой.
- Hero: заголовок Alfa Slab One 46px «Ready for a challenge?» на персиковом фоне (без градиента), кнопка «Start Solving» — белая пилюля с чёрной обводкой.
- Бенто-сетка тем: чередование заливок (orange, mint, lilac, yellow, powder blue, snow) — один крайон на карточку, чёрный текст, радиус 47px, без тени. Заблокированные — белые с чёрной обводкой и приглушённой иконкой замка.
- Daily Goal: карточка с чёрной обводкой, кольцо прогресса чёрным штрихом с цветной заливкой сегмента, число Alfa Slab One.
- Нижняя навигация: пилюля-панель, белая с чёрной обводкой, активный пункт — цветная заливка (без blur/glass).

**Quiz**
- Прогресс-бар: чёрная обводка контейнера, заливка ember-orange.
- Карточка вопроса: белая, обводка 2px, радиус 47px, выражение Alfa Slab One ~50px.
- Варианты 2×2: белые пилюли с чёрной обводкой, ≥56px. Верный — заливка lime/mint, неверный — magenta/orange, оба с чёрным текстом; состояния передаются заливкой, а не тенью.
- Кнопка «Next» — пилюля с чёрной обводкой.

**Result**
- Крупный слэб-заголовок, кольцо прогресса в том же стиле, две пилюли-кнопки: «Play Again» (цветная заливка) и «Home» (белая с обводкой).

## Технические детали

Изменяемые файлы: `src/index.css` (токены, шрифты, анимации), `tailwind.config.ts` (палитра, fontFamily, borderRadius, удаление лишнего), `shared/ui/HeroCard|TopicCard|DailyGoalCard|OptionButton|ProgressRing`, `widgets/header|bottom-nav|game-card`, `pages/home|result`. Новый `shared/ui/doodles`.

Логика игры, FSD-структура, `gameSessionService` и данные карточек не трогаются — правки только презентационные.
