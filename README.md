# Homework3 - Advanced Layered Architecture with OOP Concepts

This project demonstrates the **More Advanced** layered architecture pattern using Object-Oriented Programming (OOP) principles.

## Architecture Flow

```
Client
  ↓
Route (API Endpoints)
  ↓
Controller (Request Handling)
  ↓
Service (Business Logic)
  ↓
Repository (Data Access)
  ↓
Model (Data Entity)
  ↓
DB (Database/Storage)
```

## Layer Responsibilities

### 1. **Model Layer** (`src/models/`)
- Represents data entities and their structure
- Contains business rules related to data validation
- Implements OOP concepts: classes, interfaces, methods, factory patterns
- **File**: `User.ts` - User entity with validation and factory methods

### 2. **Repository Layer** (`src/repositories/`)
- Handles all data access operations (CRUD)
- Abstracts database implementation details
- Implements OOP concepts: interfaces, dependency inversion
- **File**: `UserRepository.ts` - Data access with in-memory storage

### 3. **Service Layer** (`src/services/`)
- Contains business logic and validation rules
- Coordinates between Repository and Controller
- Implements OOP concepts: dependency injection, encapsulation
- **File**: `UserService.ts` - Business logic for user operations

### 4. **Controller Layer** (`src/controllers/`)
- Handles HTTP requests and responses
- Delegates business logic to Service layer
- Implements OOP concepts: dependency injection, single responsibility
- **File**: `UserController.ts` - Request handlers for user endpoints

### 5. **Route Layer** (`src/routes/`)
- Defines API endpoints and URL patterns
- Maps HTTP methods to Controller methods
- **File**: `userRoutes.ts` - Route definitions for user API

## OOP Concepts Demonstrated

1. **Encapsulation**: Each layer encapsulates its own logic and data
2. **Abstraction**: Interfaces hide implementation details (e.g., `IUserRepository`)
3. **Inheritance**: Classes implement interfaces for contracts
4. **Polymorphism**: Different implementations can be swapped (e.g., different repositories)
5. **Dependency Injection**: Dependencies are injected via constructors
6. **Factory Pattern**: Static factory methods for object creation (`User.create()`)
7. **Single Responsibility Principle**: Each class has one clear purpose
8. **Interface Segregation**: Clean, focused interfaces

## Project Structure

```
homework/
├── src/
│   ├── models/
│   │   └── User.ts              # Data entity with OOP methods
│   ├── repositories/
│   │   └── UserRepository.ts    # Data access layer
│   ├── services/
│   │   └── UserService.ts       # Business logic layer
│   ├── controllers/
│   │   └── UserController.ts    # Request handling layer
│   ├── routes/
│   │   └── userRoutes.ts        # API route definitions
│   └── app.ts                   # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Build and Run
```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`
- `PUT /api/users/:id` - Update user
  - Body: `{ "name": "Jane Doe", "email": "jane@example.com" }`
- `DELETE /api/users/:id` - Delete user

## Example Usage

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1234567890

# Update user
curl -X PUT http://localhost:3000/api/users/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1234567890
```

## Key Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a single, well-defined responsibility
2. **Testability**: Layers can be tested independently with mock dependencies
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: Easy to add new features or replace implementations
5. **Reusability**: Components can be reused across different parts of the application
6. **Flexibility**: Easy to swap implementations (e.g., change database)

## Comparison with Other Architectures

### Basic Architecture
```
Client → Route → Controller → Model → DB
```
- Simple but lacks separation of concerns
- Business logic mixed with data access

### Advanced Architecture
```
Client → Route → Controller → Service → Model → DB
```
- Better separation but data access still in Service layer
- Service layer becomes bloated with data access logic

### This Implementation (Homework3)
```
Client → Route → Controller → Service → Repository → Model → DB
```
- Complete separation of concerns
- Each layer has a single responsibility
- Easy to test, maintain, and scale
- Follows SOLID principles and OOP best practices
