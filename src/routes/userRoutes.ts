// Route Layer - API Endpoint Definitions
// This layer defines the API routes and maps them to controller methods
// It acts as the entry point for HTTP requests

import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  // GET /api/users - Get all users
  router.get('/users', (req, res) => userController.getAllUsers(req, res));

  // GET /api/users/:id - Get user by ID
  router.get('/users/:id', (req, res) => userController.getUserById(req, res));

  // POST /api/users - Create new user
  router.post('/users', (req, res) => userController.createUser(req, res));

  // PUT /api/users/:id - Update user
  router.put('/users/:id', (req, res) => userController.updateUser(req, res));

  // DELETE /api/users/:id - Delete user
  router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

  return router;
}
