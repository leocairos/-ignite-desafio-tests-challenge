import request from 'supertest';
import { app } from '../../../../app';
import { Connection } from 'typeorm';

import createConnection from '../../../../database';

let connection: Connection;

describe('Show User Profile Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to show a user profile', async() => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'name user profile test',
        email: 'userprofile@test.com',
        password: '123456'
      });

    const responseToken = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'userprofile@test.com',
        password: '123456'
      });

    const { token } = responseToken.body;

    const responseShowProfile = await request(app)
      .get('/api/v1/profile')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseShowProfile.body).toHaveProperty("id")
  })
})
