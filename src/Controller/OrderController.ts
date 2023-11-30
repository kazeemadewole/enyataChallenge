import { controller, httpGet, queryParam } from "inversify-express-utils";
import { Request, Response } from 'express';
import { BaseController } from "./baseController";
import { OrderService } from "../Service/OrderService";
import { inject } from "inversify";
import TYPES from "../Config/types";
import { authGuard } from "../middleware/permission";

@controller('/order', authGuard())
export class OrderController extends BaseController {

    constructor(
      @inject(TYPES.OrderService)
        private readonly orderService: OrderService
    ) {
        super()
    }

    @httpGet('/')
    async getOrder(
      req: Request,
      res: Response
    ) {
      try {
  
        const result = await this.orderService.getOrder();

        return this.success({ res, data: result });
      } catch (error) {
        return this.error({ error, res });
      }
    }
}