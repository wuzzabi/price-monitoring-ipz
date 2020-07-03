import { Request, Response, NextFunction } from 'express'
import ShopProductsService from '@services/shopproducts.service'

export default class ShopProductsController {
    public shopProductsService = new ShopProductsService

    constructor() {}

    public GetShopProducts = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const result = await this.shopProductsService.getShopProducts(id)
            res.status(200).json({ data: result })
        } catch(error) {
            next(error)
        }
    }

    public CreateShopProduct = async (req: Request, res: Response, next: NextFunction) => {
        const shopProductData = req.body
        
        try {
            const result = await this.shopProductsService.createShopProduct(shopProductData)
            res.status(201).json({ message: 'Shop product successfully created.' })
        } catch(error) {
            next(error)
        }
    }

    public UpdateShopProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const shopProductData = req.body

        try {
            const result = await this.shopProductsService.updateShopProduct(id, shopProductData)
            res.status(200).json({ message: 'Shop product successfully updated.' })
        } catch(error) {
            next(error)
        }
    }

    public DeleteShopProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const result = await this.shopProductsService.deleteShopProduct(id)
            res.status(200).json({ message: 'Shop product successfully deleted.' })
        } catch(error) {
            next(error)
        }
    }
}