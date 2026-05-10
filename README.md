# Homework3 - Layered Architecture with MariaDB

Node.js + TypeScript + Express + MariaDB/MySQL layered architecture.

## Architecture

```
Client → Route → Controller → Service → Repository → Model → DB
```

## Project Structure

```
homework/
├── src/
│   ├── models/User.ts              # User entity
│   ├── repositories/UserRepository.ts  # Database queries
│   ├── services/UserService.ts     # Business logic
│   ├── controllers/UserController.ts   # HTTP handlers
│   ├── config/database.ts          # DB connection
│   └── app.ts                     # Server entry
├── database/
│   └── schema.sql                 # DB setup + sample data
├── .env                           # Config (not in git)
├── .env.example                   # Config template
└── package.json
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure database
Copy `.env.example` to `.env` and fill in your MariaDB credentials:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=homework3_db
PORT=3000
```

### 3. Create database
Run `database/schema.sql` in your MariaDB client (phpMyAdmin, HeidiSQL, or MySQL CLI).

It creates the database, `users` table, and **5 sample records**.

### 4. Run the server
```bash
npm run dev     # development
npm run build   # compile TypeScript
npm start       # run compiled JS
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check server status |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Test Commands (PowerShell)

```powershell
# Health check
Invoke-RestMethod -Uri http://localhost:3000/health

# Get all users
Invoke-RestMethod -Uri http://localhost:3000/api/users

# Get user by ID
Invoke-RestMethod -Uri http://localhost:3000/api/users/1

# Create user
Invoke-RestMethod -Uri http://localhost:3000/api/users -Method POST `
  -Body '{"name":"John Doe","email":"john@example.com"}' `
  -ContentType 'application/json'

# Update user
Invoke-RestMethod -Uri http://localhost:3000/api/users/1 -Method PUT `
  -Body '{"name":"Jane Doe","email":"jane@example.com"}' `
  -ContentType 'application/json'

# Delete user
Invoke-RestMethod -Uri http://localhost:3000/api/users/1 -Method DELETE
```

## Layer Descriptions

- **Model** (`User.ts`) — Defines what a user looks like
- **Repository** (`UserRepository.ts`) — Runs SQL queries against MariaDB
- **Service** (`UserService.ts`) — Validates data, checks business rules
- **Controller** (`UserController.ts`) — Handles HTTP requests/responses
- **Route** (`app.ts`) — Maps URLs to controller methods
