const Router = require('express').Router()
import IRoute from '@interfaces/routes.interface'
import CartSetController from '@controllers/cartset.controller'

export default class CartSetRoute implements IRoute {
    public router = Router
    public path = '/cartset'
    public cartSetController = new CartSetController

    constructor() {

        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, this.cartSetController.CreateCartSet)

        this.router.route(`${this.path}/:id`)
            .get(this.cartSetController.GetCartSet)
            .post(this.cartSetController.AddToCart)
            .delete(this.cartSetController.DeleteCartSet)
    }
}