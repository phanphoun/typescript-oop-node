# Homework3 - Layered Architecture with MariaDB

Node.js + TypeScript + Express + MariaDB/MySQL layered architecture.

## Architecture

```
Client → Route → Controller → Service → Repository → Database
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
Run this SQL in your MariaDB client (phpMyAdmin, HeidiSQL, or MySQL CLI):

```sql
CREATE DATABASE IF NOT EXISTS homework3_db;

USE homework3_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com'),
  ('Charlie Brown', 'charlie@example.com'),
  ('Diana Prince', 'diana@example.com'),
  ('Evan Wright', 'evan@example.com');
```

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
