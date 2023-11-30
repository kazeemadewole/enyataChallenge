import { Response, Request } from 'express';
import { injectable } from 'inversify';
import Joi from 'joi';

@injectable()
export abstract class BaseController {
  constructor() {}

  protected async validateRequest(requestBody: any, validationSchema: Joi.Schema) {
    const error = validationSchema.validate(requestBody);

    if (error?.error) {
      return Promise.resolve(error.error?.details[0].message);
    }
  }
  
  protected success({
    res,
    data,
    message = '',
    httpStatus = 200
  }: {
    res: Response;
    data: any;
    message?: string;
    httpStatus?: number;
  }) {
    return res.status(httpStatus).json({
      status: 'success',
      message: message,
      data: data
    });
  }

  protected error({
    res,
    code,
    message,
    error,
    httpStatus = 400
  }: {
    res: Response;
    code?: string;
    message?: string;
    error?: any;
    httpStatus?: number;
  }) {
    const _httpStatus = httpStatus || 500;
    return res.status(_httpStatus).send({
      status: 'error',
      code: code || 0,
      message: message || 'Error occured' ,
    });
  }

}
