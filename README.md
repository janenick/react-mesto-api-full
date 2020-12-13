# react-mesto-api-full

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.
  
Домен приложения: https://janenick.students.nomoredomains.rocks

REST API: https://api.janenick.students.nomoredomains.rocks

Публичный IP: 178.154.229.238

---------------

**Применяемые технологии**
* Node.js
* Express
* Postman
* MongoDB
* Mongoose

---------------
**Роуты**

`POST /signup` — роут для регистрации 
`POST /signin` — роут для логина 

`GET /users` — возвращает всех пользователей 
`GET /users/:userId` - возвращает пользователя по _id 
`POST /users` — создаёт пользователя 
`PATCH /users/me` — обновляет профиль 
`PATCH /users/me/avatar` — обновляет аватар 

`GET /cards` — возвращает все карточки 
`POST /cards` — создаёт карточку 
`DELETE /cards/:cardId` — удаляет карточку по идентификатору 
`PUT /cards/:cardId/likes` — поставить лайк карточке 
`DELETE /cards/:cardId/likes` — убрать лайк с карточки 

---------------
**Запуск:**

npm i - устанавливаем зависимости 
npm run dev - для запуска сервера с hot-reload 
npm run start - для запуска сервера 

