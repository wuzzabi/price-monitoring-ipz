const Router = require('express').Router()
import IRoute from '@interfaces/routes.interface'
import ShopProductsController from '@controllers/shopproducts.controller'
import { isAdminMiddleware } from '@middlewares/permission.middleware'
import authMiddleware from '@middlewares/auth.middleware'

export default class ShopProductsRoute implements IRoute {
    public path = '/shopproducts'
    public router = Router
    public shopProductsController = new ShopProductsController

    constructor() {

        this.initializeRouter()
    }

    private initializeRouter() {
        this.router.route(`${this.path}/create`)
            .post(isAdminMiddleware, this.shopProductsController.CreateShopProduct)

        this.router.route(`${this.path}/:id`)
            .get(authMiddleware, this.shopProductsController.GetShopProducts)
            .put(isAdminMiddleware, this.shopProductsController.UpdateShopProduct)
            .delete(isAdminMiddleware, this.shopProductsController.DeleteShopProduct)
    }
}