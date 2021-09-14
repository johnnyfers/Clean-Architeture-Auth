
import { hash } from "bcrypt";
import { app } from '../../src/shared/infra/http/app';
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import createConnection from "../../src/shared/infra/typeorm";

let connection: Connection;

describe("Auth User", () => {
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuid();
        const password = await hash('teste', 8);

        await connection.query(
            `INSERT INTO USERS(id, name, password, email, created_at ) 
        values('${id}', 'teste', '${password}','teste@teste.com.br', 'now()')
      `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be auth an user ", async () => {
        const response = await request(app).post("/sessions").send({
            email: "teste@teste.com.br",
            password: "teste",
        });


        expect(response.status).toBe(200);
    });
});