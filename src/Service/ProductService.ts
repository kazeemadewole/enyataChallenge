import { injectable } from "inversify";

@injectable()
export class ProductService {
    constructor() {}

    async getProduct() {
        try {
            return 'product created'
        } catch(err) {

        }
    }


    async createProduct() {
        try {
            return 'product created'
        } catch(err) {

        }
    }

}