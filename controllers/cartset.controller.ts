import { Request, Response, NextFunction } from 'express'
import CartSetService, { CartSetDBService } from '@services/cartset.service'

export default class CartSetController {
    public cartSetService = new CartSetService
    public cartSetDBService = new CartSetDBService
    constructor() {}

    public AddToCart = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const cartSet = await this.cartSetService.addToCart(req.session.cart ? req.session.cart : {}, id)
            req.session.cart = cartSet
            res.status(200).json({ message: 'Cart set successfully added to cart.' })
        } catch(error) {
            next(error)
        }
    }

    public CreateCartSet = async (req: Request, res: Response, next: NextFunction) => {
        const { cart, user_id } = req.session
        const { name } = req.body

        try {
            const result = await this.cartSetDBService.createCartSet(cart.items ? cart.items : [], user_id, name)
            res.status(201).json({ message: 'Cart set successfully created.' })
        } catch(error) {
            next(error)
        }
    }

    public DeleteCartSet = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const { user_id } = req.session

        try{
            const result = await this.cartSetDBService.deleteCartSet(user_id, id)
            res.status(200).json({ message: 'Cart set successfully deleted.' })
        } catch(error) {
            next(error)
        }
    }

    public GetCartSet = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try{
            const result = await this.cartSetDBService.getCartSet(id)
            res.status(200).json(result)
        } catch(error) {
            next(error)
        }
    }
}