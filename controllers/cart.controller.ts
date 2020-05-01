import { Request, Response, NextFunction } from 'express'
import CartService from '@services/cart.service'

export default class CartController {    
    public cartService = new CartService
    constructor() {}

    //Add product to cart by Id
    public AddToCart = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params // Product id from request param

        try {
            const cart = await this.cartService.addToCart(req.session.cart ? req.session.cart : {}, id)
            req.session.cart = cart
            res.status(200).json({ message: 'Product successfully added to cart.' })
        } catch(error) {
            next(error)
        }
    }

    //Remove product from cart by Id
    public RemoveFromCart = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const cart = await this.cartService.removeFromCart(req.session.cart ? req.session.cart : {}, id)
            req.session.cart = cart
            res.status(200).json({ message: 'Product successfully removed from cart.' })
        } catch (error) {
            next(error)
        }
    }

    // //Get all products from cart
    public GetProductsFromCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(typeof(req.session.cart) === 'undefined' || req.session.cart.items.length === 0) res.status(200).json({ message: 'Cart is empty.' })
            const result = await this.cartService.getItemsFromShops(req.session.cart.items)
            res.status(200).json(result)
        } catch(error) {
            next(error)
        }
        
    }
}