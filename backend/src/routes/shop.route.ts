const Router = require('express').Router()
import ShopController from '@controllers/shop.controller'
import IRoute from '@interfaces/routes.interface'
import { isAdminMiddleware } from '@middlewares/permission.middleware'
import authMiddleware from '@middlewares/auth.middleware'

export default class ShopRoute implements IRoute {
    public path = '/shops'
    public router = Router
    public shopController = new ShopController

    constructor() {

        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.route(`${this.path}/create`)
            .post(isAdminMiddleware, this.shopController.CreateShop)

        this.router.route(this.path)
            .get(authMiddleware, this.shopController.GetShops)
        
        this.router.route(`${this.path}/:id`)
            .put(isAdminMiddleware, this.shopController.UpdateShop)
            .delete(isAdminMiddleware, this.shopController.DeleteShop)
    }
}
