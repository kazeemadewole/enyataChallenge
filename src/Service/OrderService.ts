import { injectable } from "inversify";

@injectable()
export class OrderService {
    constructor() {}

    async getOrder() {
        try {
            return 'order created'
        } catch(err) {

        }
    }

}