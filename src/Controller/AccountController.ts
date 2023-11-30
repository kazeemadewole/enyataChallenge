import { controller, httpGet, httpPost, queryParam } from "inversify-express-utils";
import { Request, Response } from 'express';
import { BaseController } from "./baseController";
import { OrderService } from "../Service/OrderService";
import { inject } from "inversify";
import TYPES from "../Config/types";
import { AccountService } from "../Service/AccountService";

@controller('/account')
export class AccountController extends BaseController {

    constructor(
      @inject(TYPES.AccountService)
        private readonly accountService: AccountService
    ) {
        super()
    }

    @httpPost('/signup')
    async signUp(
      req: Request,
      res: Response
    ) {
      try {
  
        const result = await this.accountService.signUp();

        return this.success({ res, data: result });
      } catch (error) {
        return this.error({ error, res });
      }
    }

    @httpPost('/signin')
    async signin(
      req: Request,
      res: Response
    ) {
      try {
  
        const result = await this.accountService.signIn();

        return this.success({ res, data: result });
      } catch (error) {
        return this.error({ error, res });
      }
    }
}