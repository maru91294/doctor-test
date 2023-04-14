Запустить сервер:
 - cd server
 - npm i
 - npm run start:dev

Запустить монго

 Запустить фронт:
 - cd frontend
 - npm i
 - npm run serve

 Запросы в постман:

 1. Получить все записи
 метод GET
 http://localhost:3000/appoitment/all

 2. Получить определенную запись по id
 метод GET
 http://localhost:3000/appoitment/id

 3. Создать запись
 метод POST
 http://localhost:3000/appoitment/add
 
 передаваемые параметры:
 {
   "name": "Светлана",
   "surname": "Стрельникова",
   "lastname": "Александровна",
   "dateTime": "12-06-2023 15:00"
 }

 4. Удалить запись
 метод DELETE
 http://localhost:3000/appoitment/delete?id=