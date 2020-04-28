import { Products } from '@models/products.model'
import IProduct from '@interfaces/products.interface'
export default class CartService {
    items: object
    totalCartItems: number

    constructor(cart) {
        this.items = cart.items || {}
        this.totalCartItems = cart.totalCartItems || 0
    }

    public async addItem(id: number) {
        const item: IProduct = await Products.findOne({where: {id: id}})
        let cartItem: IItem = this.items[id]
        if(!cartItem) {
            cartItem = this.items[id] = item
            this.totalCartItems++
        }
        
        return
    }

    public removeItem(id: number) {
        this.totalCartItems--
        delete this.items[id]
    }

    public getItems(): IItem[] {
        let Carttems: IItem[] = []
        for(var id in this.items) {
            Carttems.push(this.items[id])
        }
        return Carttems
    }
}

interface IItem {
    readonly id?: number
    readonly name?: string
    readonly urlImg?: string
}