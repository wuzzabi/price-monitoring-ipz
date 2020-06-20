import { Shops } from '@models/shops.model'
import IShop from '@interfaces/shops.interface'
import HttpException from '@exceptions/HttpException'

export default class ShopService {
    constructor() {}

    public async getShops(): Promise<IShop[]> {
        const shops: IShop[] = await Shops.findAll()
        if(!shops) throw new HttpException(404, 'No shops found!')

        return shops
    }

    public async createShop(shopData: IShop): Promise<IShop> {
        const { name, url_img } = shopData
        const findShop: IShop = await Shops.findOne({ where: { name, url_img }})
        if(findShop) throw new HttpException(409, 'This shop already exists!')

        const createShopData: IShop = await Shops.create(shopData)

        return createShopData
    }

    public async updateShop(shopId: number, shopData: IShop): Promise<boolean> {
        const findShop = await Shops.findOne({ where: { id: shopId }})
        if(!findShop) throw new HttpException(404, 'Such shop doesn`t exists!')

        const updShop = await Shops.update(
            shopData, {
                where: {
                    id: shopId
                }
            }
        )

        return true
    }

    public async deleteShop(shopId: number): Promise<boolean> {
        const findShop: IShop = await Shops.findOne({ where: { id: shopId }})
        if(!findShop) throw new HttpException(404, 'Such shop doesn`t exists!')

        const delShop: number = await Shops.destroy({ where: { id: shopId }})
        return true
    }
}