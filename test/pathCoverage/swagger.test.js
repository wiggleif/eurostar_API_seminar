const supertest = require('supertest');
const { expect } = require('chai');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const request = supertest(BASE_URL);

describe('GET /api/swagger', () => {
  it('should return 200 with the Swagger UI or spec', async () => {
    const res = await request.get('/api/swagger');

    expect(res.status).to.equal(200);
  });
});
