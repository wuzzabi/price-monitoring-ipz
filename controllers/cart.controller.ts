import { Request, Response, NextFunction } from 'express'
import CartService from '@services/cart.service'
import { Products } from '@models/products.model'

export default class CartController {    
    constructor() {}

    //Add product to cart by Id
    public addToCart = async (req: Request, res: Response, next: NextFunction) => {
        const productId: number = req.params.id

        try {
            let cart = new CartService(req.session.cart ? req.session.cart : {})
            const product = await Products.findOne({
                attributes: ['id', 'name', 'url_img'],
                where: {
                    id: productId
                }})
            cart.addItem(product, productId)
            req.session.cart = cart
            res.status(200).json({ message: 'Product successfully added to cart.' })
        } catch(error) {
            next(error)
        }
    }

    //Remove product from cart by Id
    public removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
        const productId: number = req.params.id

        try {
            let cart = new CartService(req.session.cart ? req.session.cart : {})
            cart.removeItem(productId)
            req.session.cart = cart
            res.status(200).json({ message: 'Product successfully removed from cart.' })
        } catch (error) {
            next(error)
        }
    }

    //Get all products from cart
    public getProductsFromCart = async (req: Request, res: Response, next: NextFunction) => {
        let cart = new CartService(req.session.cart ? req.session.cart : {})
        res.status(200).json(cart.getItems())
    }
}