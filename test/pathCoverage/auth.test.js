const supertest = require('supertest');
const { expect } = require('chai');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const request = supertest(BASE_URL);

describe('POST /api/auth/register', () => {
  it('should register a new user and return 201 with token', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    const res = await request
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({ email: uniqueEmail, password: 'testpass123', name: 'Test User' });

    expect(res.status).to.equal(201);
    expect(res.body.success).to.equal(true);
    expect(res.body.message).to.equal('Registration successful');
    expect(res.body.data).to.have.property('token');
    expect(res.body.data.user).to.have.property('email', uniqueEmail);
  });
});

describe('POST /api/auth/login', () => {
  it('should login with valid credentials and return 200 with token', async () => {
    const res = await request
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'user1@example.com', password: 'password123' });

    expect(res.status).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(res.body.message).to.equal('Login successful');
    expect(res.body.data).to.have.property('token');
    expect(res.body.data.user).to.have.property('email', 'user1@example.com');
    expect(res.body.data.user).to.have.property('name', 'John Doe');
  });
});
