import "reflect-metadata";
import { Container } from 'inversify';
import { OrderController } from '../Controller/OrderController';
import TYPES from './types';
import { OrderService } from "../Service/OrderService";
import { AccountRepository } from "../Repository/AccountRepository";
import { ProductController } from "../Controller/ProductController";
import { AccountController } from "../Controller/AccountController";
import { ProductService } from "../Service/ProductService";
import { AccountService } from "../Service/AccountService";

const container = new Container();

// controllers
container.bind<OrderController>(TYPES.OrderController).to(OrderController).inSingletonScope();
container.bind<ProductController>(TYPES.ProductController).to(ProductController).inSingletonScope();
container.bind<AccountController>(TYPES.AccountController).to(AccountController).inSingletonScope();

// services
container.bind<OrderService>(TYPES.OrderService).to(OrderService).inSingletonScope();
container.bind<ProductService>(TYPES.ProductService).to(ProductService).inSingletonScope();
container.bind<AccountService>(TYPES.AccountService).to(AccountService).inSingletonScope();

// // repositories
container
  .bind<AccountRepository>(TYPES.AccountRepository)
  .to(AccountRepository)
  .inSingletonScope();


export default container;

