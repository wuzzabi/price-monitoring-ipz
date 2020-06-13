import { Request, Response, NextFunction } from 'express'
import ProductService from '@services/product.service'

export default class ProductController {
    public productService = new ProductService

    constructor() {}

    public GetProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const result = await this.productService.getProductsByCategory(id)
            res.status(200).json(result)
        } catch(error) {
            next(error)
        }
    }

    public CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
        const productData = req.body

        try {
            const result = await this.productService.createProduct(productData)
            res.status(201).json({ message: 'Product successfully created.' })
        } catch (error) {
            next(error)
        }
    }
}