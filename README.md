[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Место бэкенд

Серверная часть проекта "Место" написана на Express. 
Доступен функционал регистрации и авторизации, обновления информации и аватара пользователя, добавления и удаления мест, постановки и удаления лайка. 
Данные сохраняются в базе данных MongoDB.

Технологии и инструменты: JavaScript, Node.js, Express, JWT, Postman

## Директории

`/routes` — папка с файлами роутеров

`/controllers` — папка с файлами контроллеров пользователя и карточки

`/models` — папка с файлами описания схем пользователя и карточки

## Запуск проекта

`npm run start` — запускает сервер

`npm run dev` — запускает сервер с hot-reload
