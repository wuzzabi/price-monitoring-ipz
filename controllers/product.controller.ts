import { Request, Response, NextFunction } from 'express'
import ProductService from '@services/product.service'

export default class ProductController {
    public productService = new ProductService

    constructor() {}

    public GetProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const result = await this.productService.getProductsByCategory(id)
            res.status(200).json({ data: result })
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

    public DeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const result = await this.productService.deleteProduct(id)
            res.status(200).json({ message: 'Product successfully deleted.' })
        } catch (error) {
            next(error)
        }
    }

    public UpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const productData = req.body

        try {
            const result = await this.productService.updateProduct(id, productData)
            res.status(200).json({ message: 'Product successfully updated.' })
        } catch(error) {
            next(error)
        }
    }
}