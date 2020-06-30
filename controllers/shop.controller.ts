import { Request, Response, NextFunction } from 'express'
import ShopService from '@services/shop.service'

export default class ShopController {
    public shopService = new ShopService

    constructor() {}

    public GetShops = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.shopService.getShops()
            res.status(200).json({ data: result })
        } catch(error) {
            next(error)
        }
    }

    public CreateShop = async (req: Request, res: Response, next: NextFunction) => {
        const shopData = req.body

        try {
            const result = await this.shopService.createShop(shopData)
            res.status(201).json({ message: 'Shop successfully created.'})
        } catch(error) {
            next(error)
        }
    }

    public UpdateShop = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const shopData = req.body

        try {
            const result = await this.shopService.updateShop(id, shopData)
            res.status(200).json({ message: 'Shop successfully updated.' })
        } catch(error) {
            next(error)
        }
    }

    public DeleteShop = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const result = await this.shopService.deleteShop(id)
            res.status(200).json({ message: 'Shop successfully deleted.' })
        } catch(error) {
            next(error)
        }
    }
}