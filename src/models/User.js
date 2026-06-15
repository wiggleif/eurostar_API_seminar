// In-memory storage for users
let users = [
  {
    id: 1,
    email: 'user1@example.com',
    password: 'password123',
    name: 'John Doe',
    createdAt: new Date('2026-01-01')
  },
  {
    id: 2,
    email: 'user2@example.com',
    password: 'password456',
    name: 'Jane Smith',
    createdAt: new Date('2026-01-02')
  },
  {
    id: 3,
    email: 'user3@example.com',
    password: 'password789',
    name: 'Bob Johnson',
    createdAt: new Date('2026-01-03')
  }
];

let nextUserId = 4;

class User {
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static create(userData) {
    const newUser = {
      id: nextUserId++,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  }

  static getAll() {
    return users;
  }
}

module.exports = User;
