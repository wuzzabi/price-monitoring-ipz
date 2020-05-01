import HttpException from "@exceptions/HttpException"
import { CartSets } from "@models/cartsets.model"
import ICart from '@interfaces/cart.interface'
import ISessionCart from '@interfaces/sessioncart.interface'
import ICartSet from "@interfaces/cartset.interface"
import { User } from "@models/user.model"
import insertionSort from "@helpers/insertionsort.helper"
import IProduct from "@interfaces/products.interface"
import { Products } from "@models/products.model"

export default class CartSetService implements ICart {
    constructor() {}

    public async addToCart(cart: ISessionCart, cartSetId: number): Promise<ISessionCart> {
        cartSetId = Number(cartSetId)
        let { items, totalCartItems } = cart
        items = items || []
        totalCartItems = totalCartItems || 0

        const findCartSet: ICartSet = await CartSets.findOne({ where: { id: cartSetId }})
        if(!findCartSet) throw new HttpException(409, 'No such cart set in the DB.')

        const productSet: number[] = findCartSet.productSet.split(',').map(Number)
        for(let i in productSet) {
            if(items.indexOf(productSet[i]) !== -1) continue
            
            items.push(productSet[i])
            totalCartItems++
        }

        return { items, totalCartItems }
    }

    public async removeFromCart(cart: ISessionCart, id: number): Promise<ISessionCart> {return cart}

    public async getItems() {}
}

export class CartSetDBService {
    constructor() {}

    public async createCartSet(itemsArr: number[], sessionUserId: number, cartSetName: string): Promise<ICartSet> {
        itemsArr = insertionSort(itemsArr)

        if(!cartSetName) throw new HttpException(409, 'Please enter cart set name!')

        const itemsString = itemsArr.join(',')
        const findCartSet: ICartSet = await CartSets.findOne({
            where: { productSet: itemsString },
            include: [{
                model: User,
                where: {id: sessionUserId},
                attributes: ['id', 'email']
            }]})
        if(findCartSet) throw new HttpException(409, 'Cart set already exists.')

        const createCartSetData: ICartSet = await CartSets.create({productSet: itemsString, name: cartSetName, user_id: sessionUserId})
        return createCartSetData
    }

    public async deleteCartSet(userId: number, cartSetId: number): Promise<void> {
        cartSetId = Number(cartSetId)

        const findCartSet: ICartSet = await CartSets.findOne({
            where: {id: cartSetId, user_id: userId}
        })
        if(!findCartSet) throw new HttpException(409, 'You are not the owner of this cart set!')

        const deleteCartSet = await CartSets.destroy({
            where: {
                id: cartSetId
            }})

    }

    public async getCartSet(cartSetId: number): Promise<ICartSet> {
        cartSetId = Number(cartSetId)

        const findCartSet: ICartSet = await CartSets.findOne({
            where: {
                id: cartSetId
            }
        })
        if(!findCartSet) throw new HttpException(409, 'No such cart set in the DB.')

        let products: IProduct[] = []
        const productSet: number[] = findCartSet.productSet.split(',').map(Number)
        for(let id in productSet) {
            const product = await Products.findOne({
                where: {
                    id: productSet[id]
                }
            })
            products.push(product)
        }

        const newCartSet = {
            id: findCartSet.id,
            name: findCartSet.name,
            products: products
        }

        return newCartSet
    }
}
