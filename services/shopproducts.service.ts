import { ShopProducts } from '@models/shopProducts.model'
import IShop from '@interfaces/shopProduct.interface'
import HttpException from '@exceptions/HttpException'

export default class ShopProductsService {
    constructor() {}

    public async getShopProducts(shopId: number): Promise<IShop[]> {
        const findShopProducts: IShop[] = await ShopProducts.findAll({
            where : { id: shopId }
        })
        if(!findShopProducts) throw new HttpException(404, 'There are no products in this shop.')

        return findShopProducts
    }

    public async createShopProduct(shopProductData: IShop): Promise<IShop> {
        const { price, shop_id, product_id } = shopProductData
        const findShopProduct: IShop = await ShopProducts.findOne({ where: { price, shop_id, product_id }})
        if(findShopProduct) throw new HttpException(409, 'Such product already exists in this shop!')

        const createShopData: IShop = await ShopProducts.create(shopProductData)

        return createShopData
    }

    public async updateShopProduct(shopProductId: number, shopProductData: IShop): Promise<boolean> {
        const findShopProduct: IShop = await ShopProducts.findOne({ where: { id: shopProductId }})
        if(!findShopProduct) throw new HttpException(404, 'Such product doesn`t exists!')

        const updateShopProductData = await ShopProducts.update(
            shopProductData, {
                where: {
                    id: shopProductId
                }
            }
        )

        return true
    }

    public async deleteShopProduct(shopProductId: number): Promise<boolean> {
        const findShopProduct = await ShopProducts.findOne({ where: { id: shopProductId }})
        if(!findShopProduct) throw new HttpException(404, 'Such product doesn`t exists!')

        const deleteShopProductData = await ShopProducts.destroy({ where: { id: shopProductId }})

        return true
    }
}