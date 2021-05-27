import request from 'supertest';
import { app } from '../../../../app';
import { Connection } from 'typeorm';

import createConnection from '../../../../database';

let connection: Connection;

describe('Create Statement Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();
  });

  afterAll(async () => {
    //await connection.dropDatabase();
    //await connection.close();
  });

  it('should be able to create a statement', async() => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'name user statement test',
        email: 'userstatement@test.com',
        password: '123456'
      });

    const responseToken = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'userstatement@test.com',
        password: '123456'
      });

    const { token } = responseToken.body;

    const response = await request(app)
    .post('/api/v1/statements/deposit')
    .send({
      amount: 100,
      description: 'deposit $ 100'
    })
    .set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(201);
  })
})
