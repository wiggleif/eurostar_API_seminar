const { test } = require('node:test');
const assert = require('node:assert');

const BASE_URL = 'http://localhost:4000';

test('GET /api/healthcheck - should return 200 with success status', async () => {
  const response = await fetch(`${BASE_URL}/api/healthcheck`);
  const body = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(body.success, true);
  assert.strictEqual(body.message, 'API is running');
});
