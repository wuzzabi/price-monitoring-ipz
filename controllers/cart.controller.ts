import { Request, Response, NextFunction } from 'express'
import CartService from '@services/cart.service'
import { Products } from '@models/products.model'
export default class CartController {    
    constructor() {}

    //Add product to cart by Id
    public addToCart = async (req: Request, res: Response, next: NextFunction) => {
        let cart = new CartService(req.session.cart ? req.session.cart : {})
        const productId: number = req.params.id
        cart.addItem(productId)
        req.session.cart = cart
        res.status(200).json({ message: 'Product successfully added to cart.' })
    }

    //Remove product from cart by Id
    public removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
        let cart = new CartService(req.session.cart ? req.session.cart : {})
        const productId: number = req.params.id
        cart.removeItem(productId)
        req.session.cart = cart
        req.status(200).json({ message: 'Product successfully removed from cart.' })
    }

    //Get all products from cart
    public getProductsFromCart = async (req: Request, res: Response, next: NextFunction) => {
        let cart = new CartService(req.session.cart ? req.session.cart : {})
        res.status(200).json(cart.getItems())
    }
}