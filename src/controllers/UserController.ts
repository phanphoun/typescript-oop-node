// Controller - Handles HTTP requests

import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || String(error) });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.service.getUserById(id);

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || String(error) });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await this.service.createUser(name, email);
      res.status(201).json({ success: true, message: 'User created', data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || String(error) });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name, email } = req.body;
      const user = await this.service.updateUser(id, name, email);

      if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({ success: true, message: 'User updated', data: user });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || String(error) });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.service.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || String(error) });
    }
  }
}
