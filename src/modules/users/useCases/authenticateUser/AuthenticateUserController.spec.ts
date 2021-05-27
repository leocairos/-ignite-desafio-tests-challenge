import request from 'supertest';

import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../app';
import { Connection } from 'typeorm';

import createConnection from '../../../../database';

let connection: Connection;

describe('Authenticate User Controller', () => {

  beforeAll(async () => {
    connection = await createConnection('localhost', true);
    await connection.runMigrations();
  });

  afterAll(async () => {
    //await connection.dropDatabase();
    //await connection.close();
  });

  it('should be able to authenticate a user', async() => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'name user auth test',
        email: 'userauth@test.com',
        password: '123456'
      });

    const response = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: 'userauth@test.com',
        password: '123456'
      });

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  })
})
