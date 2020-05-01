import IProduct from "./products.interface";

export default interface IShopProduct {
    readonly id?: number
    readonly price?: string
    readonly shop_id?: number
    readonly product_id?: number
    readonly Product?: IProduct
}