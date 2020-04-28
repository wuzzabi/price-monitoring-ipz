const Router = require('express').Router()
import CartController from '@controllers/cart.controller'
import IRoute from '@interfaces/routes.interface'

export default class CartRoute implements IRoute {
    public path = '/cart'
    public router = Router
    public cartController = new CartController()

    constructor() {

        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.route(this.path)
            .get(this.cartController.getProductsFromCart)

        this.router.route(`${this.path}/:id`)
            .post(this.cartController.addToCart)
            .delete(this.cartController.removeFromCart)
    }
}