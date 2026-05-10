// Service - Business logic

import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
  private repo: UserRepository;

  constructor() {
    this.repo = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.repo.findById(id);
  }

  async createUser(name: string, email: string): Promise<User> {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Valid email is required');
    }

    // Check if email already exists
    const users = await this.repo.findAll();
    for (const user of users) {
      if (user.email === email) {
        throw new Error('Email already exists');
      }
    }

    return await this.repo.create(name.trim(), email.trim());
  }

  async updateUser(id: number, name: string, email: string): Promise<User | null> {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Valid email is required');
    }

    return await this.repo.update(id, name.trim(), email.trim());
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.repo.delete(id);
  }
}
