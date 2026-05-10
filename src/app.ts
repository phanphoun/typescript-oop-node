// Main file - Start the server

import 'dotenv/config';
import express from 'express';
import { UserController } from './controllers/UserController';

const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON body
app.use(express.json());

// Create controller
const userController = new UserController();

// Routes
app.get('/api/users', (req, res) => userController.getAllUsers(req, res));
app.get('/api/users/:id', (req, res) => userController.getUserById(req, res));
app.post('/api/users', (req, res) => userController.createUser(req, res));
app.put('/api/users/:id', (req, res) => userController.updateUser(req, res));
app.delete('/api/users/:id', (req, res) => userController.deleteUser(req, res));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('');
  console.log('API Endpoints:');
  console.log(`  GET    http://localhost:${PORT}/api/users`);
  console.log(`  GET    http://localhost:${PORT}/api/users/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/users`);
  console.log(`  PUT    http://localhost:${PORT}/api/users/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/users/:id`);
});

export default app;
