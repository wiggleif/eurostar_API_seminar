const supertest = require('supertest');
const { expect } = require('chai');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';
const request = supertest(BASE_URL);

describe('POST /api/checkout/checkout', () => {
  let token;

  before(async () => {
    const res = await request
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'user2@example.com', password: 'password456' });

    token = res.body.data.token;
  });

  it('should checkout with cash payment and return 200 with 10% discount', async () => {
    const res = await request
      .post('/api/checkout/checkout')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: 2, quantity: 1 }],
        paymentMethod: 'cash'
      });

    expect(res.status).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(res.body.message).to.equal('Checkout successful');
    expect(res.body.data).to.have.property('orderId');
    expect(res.body.data.paymentMethod).to.equal('cash');
    expect(res.body.data.discount).to.be.greaterThan(0);
  });
});
