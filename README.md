# Outlet Auth

## Описание

Outlet Auth е уеб приложение/модул за автентикация и управление на потребителски профили със **задължителна имейл верификация**. Поддържа регистрация, вход и потвърждение на регистрацията чрез **токен с валидност (TTL)**. Без потвърден имейл потребителят **не може да влезе** в сайта. При успешен вход се издава **JWT токен** с времеви лимит. Съхраняват се и данни за анализ (напр. дата на верификация и последен вход).

## Основни функционалности

- Регистрация с email и парола
- Изпращане на имейл за потвърждение (verification email)
- Верификация на профил чрез токен с валидност (TTL)
- Забрана за login без верификация
- Login с проверка на парола и издаване на JWT токен с валидност
- Запис на аналитика (verified_at, last_login_at и др.)
- Responsive UI (React + Bootstrap)
- Валидация на форми със Zod

## Технологии

### Client (Frontend)

- React
- Bootstrap (responsive дизайн)
- Zod (валидация на форми)

### Server (Backend)

- Node.js + TypeScript
- Express
- PostgreSQL
- pg (node-postgres)
- Nodemailer (изпращане на имейли)
- bcrypt (хеширане на пароли)
- jsonwebtoken (JWT)
- dotenv (конфигурация)

## Архитектура

### Client (Frontend)

Client частта е организирана модулно (UI, страници, routing, контекст, услуги и валидация):

- Components: по-малки UI части/секции, които се използват вътре в страниците (reusable компоненти)
- Pages: основните страници/екрани на приложението
- Routes: конфигурация на маршрути (routing) и защита на маршрути (public/protected outlets)
- Context: глобално състояние (auth state, token, login/logout функции)
- Services: комуникация с backend (HTTP заявки към auth endpoints)
- Schemas: Zod схеми за валидиране на форми и входни данни
- Interfaces: TypeScript типове/интерфейси за данни и отговори от API
- Styles: глобални стилове и custom CSS

### Server (Backend)

Проектът е организиран в слоеве за по-лесна поддръжка:

- Routes: дефинират endpoint-ите и мапват към контролери
- Controllers: приемат request-а, валидират входа и връщат отговор
- Services: бизнес логика (register, verify, login, email)
- Models: структури/заявки към DB
- Middleware: JWT guard, error handler, request validation и др.
- Utils: помощни функции (tokens, helpers, константи)

Структура:

- server/
  - src/
    - controllers/
    - db/
    - middleware/
    - models/
    - routes/
    - services/
    - utils/
Структура:

- client/
  - src/
    - components/
    - context/
    - interfaces/
    - pages/
    - routes/
    - schemas/
    - services/
    - styles/

## Поток на автентикация

### Регистрация и верификация

1. Потребителят попълва регистрация (email, password)
2. Frontend валидира данните със Zod
3. Backend:
   - проверява дали email вече съществува
   - хешира паролата с bcrypt и записва потребителя (is_verified = false)
   - генерира verification токен с валидност (TTL)
   - записва токена и срока му в DB
   - изпраща имейл чрез Nodemailer с линк за потвърждение
4. При отваряне на линка:
   - backend валидира токена и проверява дали не е изтекъл
   - маркира профила като верифициран (is_verified = true)
   - записва дата на верификация (verified_at)

### Login

1. Потребителят въвежда email и password
2. Backend:
   - ако профилът не е верифициран -> отказ (например 403)
   - сравнява паролата с bcrypt.compare
   - при успех генерира JWT access token с валидност и го връща
   - записва аналитика (например last_login_at)

## API (примерни endpoint-и)

- POST /auth/register
  Регистрация + изпращане на verification email
- GET /auth/verify?token=...
  Верификация чрез token
- POST /auth/login
  Вход (само за verified потребители)
- POST /auth/resend-verification
  Повторно изпращане на verification email
- POST /auth/logout
  Логически logout (клиентът изтрива токена)

## Примерни payload-и

(WIP)

## Конфигурация (.env)

- Тук се изисква да се създадат променливи за имейла и ключ, чрез които ще се изпращат имейлите.
- Изисква се адреса на базата данни.

```env
  EMAIL_USER=example@mail.com
  EMAIL_PASS=exampleauthpass
  DATABASE_URL=postgres://user:pass@localhost:5432/outlet_auth
```

## Инсталация и стартиране

1. Създаване на .env и попълни DB, JWT и SMTP настройките
2. Инсталиране на зависимостите за backend и client

Client(Frontend):

```bash
cd client
npm install
```

Server(Backend):

```bash
cd ../server
npm install
```

3. Създаване на таблиците в PostgreSQL
4. Стартиране backend и frontend

   Client(Frontend):

```bash
cd client
npm run dev
```

Server(Backend):

```bash
cd ../server
npm start
```
