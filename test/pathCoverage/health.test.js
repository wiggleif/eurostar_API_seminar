const supertest = require('supertest');
const { expect } = require('chai');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const request = supertest(BASE_URL);

describe('GET /api/healthcheck', () => {
  it('should return 200 with API running status', async () => {
    const res = await request.get('/api/healthcheck');

    expect(res.status).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(res.body.message).to.equal('API is running');
    expect(res.body).to.have.property('timestamp');
  });
});
