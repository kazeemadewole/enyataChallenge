import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AccountRepository } from '../Repository/AccountRepository';

export function authGuard() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userAccountRepo = new AccountRepository();

      const token = req.headers.authorization?.split(' ')[1];

      let userInfo: any = {};

      if (token) {
        userInfo = jwt.decode(token);
      }

      if (!userInfo?.user) {
        return res.status(422).send({
          error: false,
          message: 'Invalid User token | user cannot be verified',
          data: {}
        });
      }

      const userId = userInfo?.user?.id;
      const user = await userAccountRepo.findById(userId);
      if (user == null) {
        return res.status(404).send({
          error: false,
          message: `User with id: '${userId}' does not exist`,
          data: {}
        });
      }

      res.locals.user = user;
      next();
    } catch (error) {
      console.error(error);
    }
  };
}

export async function getLoggedInUser(req: Request, res: Response) {
  try {
    const userAccountRepo = new AccountRepository();

    const token = req.headers.authorization?.split(' ')[1];

    let userInfo: any = {};

    if (token) {
      userInfo = jwt.decode(token);
    }

    if (!userInfo?.user) {
      return res.status(422).send({
        error: false,
        message: 'Invalid User token | user cannot be verified',
        data: {}
      });
    }

    const userId = userInfo?.user?.id;
    const user = await userAccountRepo.findById(userId);
    if (user == null) {
      return res.status(404).send({
        error: false,
        message: `User with id: '${userId}' does not exist`,
        data: {}
      });
    }
    return user;
  } catch (error) {
    return error;
  }
}
