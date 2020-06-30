const Router = require('express').Router()
import IRoute from '@interfaces/routes.interface'
import ProductController from '@controllers/product.controller'

export default class ProductRoute implements IRoute {
    public router = Router
    public path = '/products'
    public productController = new ProductController

    constructor() {

        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.route(`${this.path}/create`)
            .post(this.productController.CreateProduct)

        this.router.route(`${this.path}/:id`)
            .get(this.productController.GetProductsByCategory)
            .delete(this.productController.DeleteProduct)
            .put(this.productController.UpdateProduct)
    }
}