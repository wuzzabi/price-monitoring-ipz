import { Request, Response, NextFunction } from 'express'
import CartService from '@services/cart.service'

export default class CartController {    
    constructor() {}

    public addToCart = async (req: Request, res: Response, next: NextFunction) => {
        let cart = new CartService(req.session.cart ? req.session.cart : {})

    }
}