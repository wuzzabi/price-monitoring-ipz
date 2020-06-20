const Router = require('express').Router()
import ShopController from '@controllers/shop.controller'
import IRoute from '@interfaces/routes.interface'

export default class ShopRoute implements IRoute {
    public path = '/shops'
    public router = Router
    public shopController = new ShopController

    constructor() {

        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.route(`${this.path}/create`)
            .post(this.shopController.CreateShop)

        this.router.route(this.path)
            .get(this.shopController.GetShops)
        
        this.router.route(`${this.path}/:id`)
            .put(this.shopController.UpdateShop)
            .delete(this.shopController.DeleteShop)
    }
}
