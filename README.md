# HRM PWA - Плагин для Google Chrome.

### Файлы конфигурации:
- `/public/config.json` - Конфигурация endpoint`s;
- `/.env.development` - Параметры окружения для разработки;
- `/.env.production` - Параметры окружения для сборки;
- `/src/common/constants/configConst.ts` - Перечень endpoint`s, которые должны быть сконфигурированы;
- `/.prettierrc` - Конфигурация для библиотеки Prettier;
- `/.eslintrc.json` - Конфигурация для ESLint.

### Установка пакетов и запуск разработки:
- Установка пакета typescript `npm i typescript` (опционально);
- Установка пакетов: `npm i`;
- Запуск приложения в режиме разработки `npm run start`;
- Откройте [http://127.0.0.1:3000](http://127.0.0.1:3000) чтобы посмотреть работу приложения в браузере.

### Сборка билда:
- Запуск сборки: `npm run build`;
- После сборки в папке build:
  - Создаёте файл `/static/js/start.chunk.js`;
  - Перемещаете в него всё содержимое тега <script> из файла `/index.html`;
  - После чего подключаете созданный файл `/static/js/start.chunk.js` в `/index.html`;