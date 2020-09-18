## 🗂 Code Structure
```bash
.
├── README.md
├── controllers
│   ├── auth.controller.ts
│   ├── cart.controller.ts
│   ├── cartset.controller.ts
│   ├── product.controller.ts
│   ├── receipt.controller.ts
│   ├── shop.controller.ts
│   ├── shopproducts.controller.ts
│   └── user.controller.ts
├── exceptions
│   └── HttpException.ts
├── helpers
│   └── insertionsort.helper.ts
├── interfaces
│   ├── cart.interface.ts
│   ├── cartset.interface.ts
│   ├── categories.interface.ts
│   ├── products.interface.ts
│   ├── receipts.inteface.ts
│   ├── roles.interface.ts
│   ├── routes.interface.ts
│   ├── sessioncart.interface.ts
│   ├── shopProduct.interface.ts
│   ├── shops.interface.ts
│   ├── units.inerface.ts
│   └── user.interface.ts
├── middlewares
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── permission.middleware.ts
├── models
│   ├── cartsets.model.ts
│   ├── categories.model.ts
│   ├── index.model.ts
│   ├── products.model.ts
│   ├── receipts.model.ts
│   ├── roles.model.ts
│   ├── shopProducts.model.ts
│   ├── shops.model.ts
│   ├── units.model.ts
│   └── user.model.ts
├── routes
│   ├── auth.route.ts
│   ├── cart.route.ts
│   ├── cartset.route.ts
│   ├── product.route.ts
│   ├── shopproducts.route.ts
│   └── shop.route.ts
├── services
│   ├── auth.service.ts
│   ├── cart.service.ts
│   ├── cartset.service.ts
│   ├── mail.service.ts
│   ├── product.service.ts
│   ├── shopproducts.service.ts
│   └── shop.service.ts
├── tests
│   ├── cartset.test.ts
│   └── products.test.ts
├── app.ts
├── server.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```