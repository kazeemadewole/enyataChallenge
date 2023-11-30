import { injectable } from "inversify";

@injectable()
export class OtpRepository {
    constructor() {}

    async findOne(email: string) {
        try {
            return 'user'
        } catch(err) {

        }
    }


    async findAll() {
        try {
            return 'all user retrieved'
        } catch(err) {

        }
    }

    async create(payload: any) {
        try {
            return 'user created'
        } catch(err) {

        }
    }

}