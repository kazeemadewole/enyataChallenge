const TYPES = {
    // controllers
    OrderController: Symbol('OrderController'),
    ProductController: Symbol('ProductController'),
    AccountController: Symbol('AccountController'),

    // // service
    OrderService: Symbol('OrderService'),
    AccountService: Symbol('AccountService'),
    ProductService: Symbol('ProductService'),
   
    // // repositories
    AccountRepository: Symbol('AccountRepository'),
    OtpRepository: Symbol('OtpRepository'),

    // // database
    // DatabaseConnection: Symbol('DatabaseConnection')
  };
  
  export default TYPES;
  