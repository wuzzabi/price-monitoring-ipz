const Router = require('express').Router()
import IRoute from '@interfaces/routes.interface'
import ProductController from '@controllers/product.controller'
import { isAdminMiddleware } from '@middlewares/permission.middleware'
import authMiddleware from '@middlewares/auth.middleware'

export default class ProductRoute implements IRoute {
    public router = Router
    public path = '/products'
    public productController = new ProductController

    constructor() {

        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(`${this.path}/create`)
            .post(isAdminMiddleware, this.productController.CreateProduct)

        this.router.route(`${this.path}/:id`)
            .get(authMiddleware, this.productController.GetProductsByCategory)
            .delete(isAdminMiddleware, this.productController.DeleteProduct)
            .put(isAdminMiddleware, this.productController.UpdateProduct)
    }
}