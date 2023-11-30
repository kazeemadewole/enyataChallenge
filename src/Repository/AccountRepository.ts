import { injectable } from "inversify";
import client from "../Config/db";
import { ISignUp } from "../types/account.interface";

@injectable()
export class AccountRepository {
    constructor() {}

    async findOne(email: string) {
        try {
            const sqlQuery = `SELECT * from user where email = ${email}`;

           const user = await client.query(sqlQuery);

           return user

        } catch(err) {

        }
    }

    async findById(id: string) {
        try {
            const sqlQuery = `SELECT * from user where id = ${id}`;

           const user = await client.query(sqlQuery);

           return user
        } catch(err) {

        }
    }


    async findAll() {
        try {
            const sqlQuery = `SELECT * from user `;

           const user = await client.query(sqlQuery);

           return user
        } catch(err) {

        }
    }

    async createUser(payload: ISignUp) {
        try {
            const sqlQuery = `INSERT INTO USER (firstName, lastName, email, password) VALUES () `;

           const user = await client.query(sqlQuery);

           return user
        } catch(err) {

        }
    }

}