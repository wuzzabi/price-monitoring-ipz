const Router = require('express').Router()
import CartController from '@controllers/cart.controller'
import IRoute from '@interfaces/routes.interface'
import { isAdminMiddleware } from '@middlewares/permission.middleware'
import authMiddleware from '@middlewares/auth.middleware'

export default class CartRoute implements IRoute {
    public path = '/cart'
    public router = Router
    public cartController = new CartController()

    constructor() {

        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.route(this.path)
            .get(authMiddleware, this.cartController.GetProductsFromCart)

        this.router.route(`${this.path}/:id`)
            .post(isAdminMiddleware, this.cartController.AddToCart)
            .delete(isAdminMiddleware, this.cartController.RemoveFromCart)
    }
}