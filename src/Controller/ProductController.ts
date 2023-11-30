import { controller, httpGet, httpPost, queryParam } from "inversify-express-utils";
import { Request, Response } from 'express';
import { BaseController } from "./baseController";
import { OrderService } from "../Service/OrderService";
import { inject } from "inversify";
import TYPES from "../Config/types";
import { authGuard } from "../middleware/permission";

@controller('/product', authGuard())
export class ProductController extends BaseController {

    constructor(
      @inject(TYPES.OrderService)
        private readonly orderService: OrderService
    ) {
        super()
    }

    @httpGet('/')
    async getProduct(
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

    @httpPost('/')
    async createProduct(
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