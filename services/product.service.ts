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
        if(!(name && unit_id && category_id)) throw new HttpException(409, 'Please enter erquired data!')

        const findProduct: IProduct = await Products.findOne({
            where: { name, unit_id, category_id }
        })
        if(findProduct) throw new HttpException(409, 'Product already exists!')

        const createProductData = await Products.create({ name, url_img, unit_id, category_id })
        
        return createProductData
    }
}