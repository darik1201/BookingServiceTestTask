Booking API

Простое API для бронирования мест
Реализовано на Node.js (Express) и PostgreSQL.

---

## Структура проекта

```
booking-api/
├─ sql/   
│  └─ migrations
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  ├─ db/
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/
│  ├─ repositories/
│  └─ middleware/
├─ .env
├─ .env.example
├─ .gitignore
├─ package.json
└─ README.md
```
---

## Установка и настройка

### Установить зависимости

```bash
npm install
```
### Подготовить базу данных

```bash
sudo -u postgres psql
CREATE USER appuser WITH PASSWORD 'apppass';
CREATE DATABASE bookingdb OWNER appuser;
```

### Применить миграции

```bash
npm run migrate
```
---

## Запуск приложения

```bash
npm run dev
```

Приложение по умолчанию слушает `http://localhost:3000`.

---

## Команды curl

### 1. Создать бронь

```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Content-Type: application/json" \
  -d '{"event_id":1,"user_id":"user123"}'
```

Ответ:

```json
{
  "booking": {
    "id": 1,
    "event_id": 1,
    "user_id": "user123",
    "created_at": "2025-10-23T18:00:00.000Z"
  }
}
```

### 2. Повторная бронь → ошибка

```json
{
  "error": "User already booked this event",
  "code": "ALREADY_BOOKED"
}
```

### 3. Несуществующее событие

```json
{
  "error": "Event not found",
  "code": "EVENT_NOT_FOUND"
}
```

---

## SQL-структура

### Таблица `events`

| Поле        | Тип     | Описание    |
| ----------- | ------- | ----------- |
| id          | SERIAL  | ID события  |
| name        | VARCHAR | Название    |
| total_seats | INT     | Кол-во мест |

### Таблица `bookings`

| Поле       | Тип       | Описание        |
| ---------- | --------- | --------------- |
| id         | SERIAL    | ID брони        |
| event_id   | INT       | FK → events.id  |
| user_id    | VARCHAR   | ID пользователя |
| created_at | TIMESTAMP | Время брони     |

---
