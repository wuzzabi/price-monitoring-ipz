import HttpException from "@exceptions/HttpException"
import { Products } from "@models/products.model"
import IProduct from '@interfaces/products.interface'

export default class ProductService {
    constructor() {}

    public async getProductsByCategory(categoryId: number): Promise<IProduct[]> {
        categoryId = Number(categoryId)

        const findProducts: IProduct[] = await Products.findAll({
            where: {category_id: categoryId},
            attributes: ['id', 'name', 'url_img']
        })
        if(!findProducts) throw new HttpException(404, 'No products found with this category!')

        return findProducts
    }

    public async createProduct(productData: IProduct): Promise<IProduct> {
        const { name, url_img, unit_id, category_id } = productData
        if(!(name && unit_id && category_id)) throw new HttpException(409, 'Please enter required data!')

        const findProduct: IProduct = await Products.findOne({ where: { name, unit_id, category_id } })
        if(findProduct) throw new HttpException(409, 'Product already exists!')

        const createProductData = await Products.create({ name, url_img, unit_id, category_id })
        
        return createProductData
    }

    public async deleteProduct(productId: number): Promise<boolean> {
        const findProduct: IProduct = await Products.findOne({ where: { id: productId } })
        if(!findProduct) throw new HttpException(404, 'Such product doesn`t exist!')

        const delProduct = await Products.destroy({
            where: { id: productId }
        })

        return true
    }

    public async updateProduct(productId: number, productData: IProduct): Promise<boolean> {        
        const findProduct = await Products.findOne({ where: { id: productId } })
        if(!findProduct) throw new HttpException(404, 'Such product doesn`t exist!')

        const updProduct = await Products.update(
            productData, {
                where: {
                id: productId
            }}
        )

        return true
    }
}