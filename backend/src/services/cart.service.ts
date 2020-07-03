import HttpException from '@exceptions/HttpException'
import { Products } from '@models/products.model'
import ISessionCart from '@interfaces/sessioncart.interface'
import ICart from '@interfaces/cart.interface'
import IShop from '@interfaces/shops.interface'
import { Shops } from '@models/shops.model'
import { ShopProducts } from '@models/shopProducts.model'
import IShopProduct from '@interfaces/shopProduct.interface'

export default class CartService implements ICart {
    constructor() {}

    public async addToCart(cart: ISessionCart, id: number): Promise<ISessionCart> {
        id = Number(id)
        let { items, totalCartItems } = cart
        items = items || []
        totalCartItems = totalCartItems || 0

        const item: IItem = await Products.findOne({ where: { id: id }})
        if(!item) throw new HttpException(409, 'No such item in the DB.')

        if(items.indexOf(id) == -1) {
            items.push(id)
            totalCartItems++
        }

        return { items, totalCartItems }
    }

    public async removeFromCart(cart: ISessionCart, id: number): Promise<ISessionCart> {
        id = Number(id)
        let { items, totalCartItems } = cart
        items = items || []
        totalCartItems = totalCartItems || 0

        const index: number = cart.items.indexOf(id)
        if(index === -1) throw new HttpException(409, 'No such item in the cart.')

        items.splice(index, 1)
        totalCartItems--
        
        return { items, totalCartItems }
    }

    public async getItemsFromShops(items: number[]): Promise<object> {
        const shops: IShop[] = await Shops.findAll()
        let result: object[] = []

        for(let i in shops) {
            let shop = shops[i]
            let totalPrice: number = 0
            let products: object[] = []

            for(let j in items) {
                const shopProduct: IShopProduct = await ShopProducts.findOne({
                    where: {
                        shop_id: shop.id, 
                        product_id: items[j]
                    },
                    include: [{
                        model: Shops
                    }, {
                        model: Products
                    }]
                })
                totalPrice += parseFloat(shopProduct.price)
                products.push({ name: shopProduct.Product.name, price: shopProduct.price})
            }

            result.push({
                shop,
                products,
                totalPrice
            })
        }

        return result
    }
}

interface IItem {
    readonly id?: number
    readonly name?: string
    readonly url_img?: string
}