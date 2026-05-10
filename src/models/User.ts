// Model - Defines how user data looks

export class User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;

  constructor(id: number, name: string, email: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  // Make a User from database row
  static fromRow(row: any): User {
    return new User(
      row.id,
      row.name,
      row.email,
      new Date(row.created_at)
    );
  }
}
