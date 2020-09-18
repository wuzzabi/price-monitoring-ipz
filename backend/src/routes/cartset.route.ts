const Router = require('express').Router()
import IRoute from '@interfaces/routes.interface'
import CartSetController from '@controllers/cartset.controller'
import authMiddleware from '@middlewares/auth.middleware'

export default class CartSetRoute implements IRoute {
    public router = Router
    public path = '/cartset'
    public cartSetController = new CartSetController

    constructor() {

        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, authMiddleware, this.cartSetController.CreateCartSet)

        this.router.route(`${this.path}/:id`)
            .get(authMiddleware, this.cartSetController.GetCartSet)
            .post(authMiddleware, this.cartSetController.AddToCart)
            .delete(authMiddleware, this.cartSetController.DeleteCartSet)
    }
}