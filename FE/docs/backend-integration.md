# Backend Integration Plan

This frontend currently runs with mock data only.
No real API call is used yet.

## Base API

- Base URL: `/api/v1`
- Content type: `application/json`
- Auth header: `Authorization: Bearer <JWT_TOKEN>`

## Auth Endpoints

### POST `/auth/login`

Request:

```json
{
  "username": "admin",
  "password": "123"
}
```

Response:

```json
{
  "token": "<jwt>",
  "user": {
    "id": 1,
    "username": "admin",
    "name": "Admin Library",
    "email": "admin@library.local",
    "role": "admin"
  }
}
```

### POST `/auth/logout`

Request body can be empty.

Response:

```json
{
  "success": true
}
```

## Book Endpoints

### GET `/books`

Query params:
- `query` (optional)
- `category` (optional)
- `status` (optional)

Response:

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "Programming",
    "quantity": 5,
    "status": "available"
  }
]
```

### GET `/books/:id`

Response:

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Programming",
  "quantity": 5,
  "status": "available"
}
```

### POST `/books`

Request:

```json
{
  "title": "Domain-Driven Design",
  "author": "Eric Evans",
  "category": "Software Engineering",
  "quantity": 3
}
```

Response:

```json
{
  "id": 7,
  "title": "Domain-Driven Design",
  "author": "Eric Evans",
  "category": "Software Engineering",
  "quantity": 3,
  "status": "available"
}
```

### PUT `/books/:id`

Request:

```json
{
  "title": "Clean Code 2nd Edition",
  "quantity": 4
}
```

Response:

```json
{
  "id": 1,
  "title": "Clean Code 2nd Edition",
  "author": "Robert C. Martin",
  "category": "Programming",
  "quantity": 4,
  "status": "available"
}
```

### DELETE `/books/:id`

Response:

```json
{
  "success": true,
  "deletedId": 1
}
```

## Borrow Endpoints

### GET `/borrows?userId=<id>`

Response:

```json
[
  {
    "id": 1,
    "userId": 2,
    "bookId": 1,
    "borrowedAt": "2026-02-01",
    "dueDate": "2026-03-01",
    "returnedAt": null,
    "status": "borrowing"
  }
]
```

### POST `/borrows`

Request:

```json
{
  "userId": 2,
  "bookId": 1
}
```

Response:

```json
{
  "id": 12,
  "userId": 2,
  "bookId": 1,
  "borrowedAt": "2026-02-25",
  "dueDate": "2026-03-27",
  "returnedAt": null,
  "status": "borrowing"
}
```

### POST `/borrows/:id/return`

Response:

```json
{
  "id": 12,
  "status": "returned",
  "returnedAt": "2026-03-02"
}
```

### POST `/borrows/:id/renew`

Request:

```json
{
  "days": 7
}
```

Response:

```json
{
  "id": 12,
  "dueDate": "2026-04-03"
}
```

## Required Fields

### User
- `id` (number)
- `username` (string)
- `name` (string)
- `email` (string)
- `role` (string: `admin` | `user`)

### Book
- `id` (number)
- `title` (string)
- `author` (string)
- `category` (string)
- `quantity` (number)
- `status` (string: `available` | `unavailable`)

### Borrow
- `id` (number)
- `userId` (number)
- `bookId` (number)
- `borrowedAt` (YYYY-MM-DD)
- `dueDate` (YYYY-MM-DD)
- `returnedAt` (YYYY-MM-DD or null)
- `status` (string: `borrowing` | `returned`)

## JWT Structure

Expected JWT payload example:

```json
{
  "sub": "1",
  "username": "admin",
  "role": "admin",
  "iat": 1771977600,
  "exp": 1771984800
}
```

- `sub`: user id
- `role`: used by router guard for authorization

## Role Structure

Supported roles:

- `admin`: full CRUD on books and admin pages
- `user`: browse and borrow books on user pages

## Integration Notes

When backend is ready:

1. Replace mock logic inside `src/services/*.js` with real HTTP calls.
2. Keep response shape compatible with current stores/components.
3. Keep route guards unchanged, only token source/validation logic may change.
4. Preserve `admin` and `nguoidung` folder separation.
