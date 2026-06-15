const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

class AuthService {
  static login(email, password) {
    const user = User.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    // Simple password check (in production, use bcrypt for hashing)
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    };
  }

  static register(email, password, name) {
    const existingUser = User.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = User.create({
      email,
      password,
      name
    });

    // Generate JWT token for new user
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token
    };
  }
}

module.exports = AuthService;
