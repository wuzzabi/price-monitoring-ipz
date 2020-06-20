const Router = require('express').Router()
import IRoute from '@interfaces/routes.interface'
import ShopProductsController from '@controllers/shopproducts.controller'

export default class ShopProductsRoute implements IRoute {
    public path = '/shopproducts'
    public router = Router
    public shopProductsController = new ShopProductsController

    constructor() {

        this.initializeRouter()
    }

    private initializeRouter() {
        this.router.route(`${this.path}/create`)
            .post(this.shopProductsController.CreateShopProduct)

        this.router.route(`${this.path}/:id`)
            .get(this.shopProductsController.GetShopProducts)
            .put(this.shopProductsController.UpdateShopProduct)
            .delete(this.shopProductsController.DeleteShopProduct)
    }
}