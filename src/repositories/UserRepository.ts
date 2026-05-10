// Repository - Talks to the database

import { User } from '../models/User';
import { pool } from '../config/database';

export class UserRepository {

  // Get all users
  async findAll(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM users');
    return (rows as any[]).map(row => User.fromRow(row));
  }

  // Get one user by ID
  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    const results = rows as any[];
    if (results.length === 0) {
      return null;
    }
    return User.fromRow(results[0]);
  }

  // Add new user
  async create(name: string, email: string): Promise<User> {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    const insertId = (result as any).insertId;
    return this.findById(insertId) as Promise<User>;
  }

  // Update user
  async update(id: number, name: string, email: string): Promise<User | null> {
    await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return this.findById(id);
  }

  // Delete user
  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}
