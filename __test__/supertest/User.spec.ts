
import { app } from '../../src/shared/infra/http/app';
import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from "../../src/shared/infra/typeorm";

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

  });

  afterAll(async () => {
  });

  it('should be able to create a new User ', async () => {
    const response = await request(app).post('/users').send({
      name: 'oii',
      email: 'oi@oi.com.br',
      password: 'oiii',
    });

    expect(response.status).toBe(201);
  });
});