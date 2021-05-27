import request from 'supertest';
import { app } from '../../../../app';
import { Connection } from 'typeorm';

import createConnection from '../../../../database';

let connection: Connection;

describe('Create User Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();
  });

  afterAll(async () => {
    //await connection.dropDatabase();
    //await connection.close();
  });

  it('should be able to create a new user', async() => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'name user',
        email: 'user@test.com',
        password: '123456'
      });
    expect(response.status).toBe(201);
  })
})
