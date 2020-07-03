import ISessionCart from "./sessioncart.interface"

export default interface ICart {
    addToCart(cart: object, id: number): Promise<ISessionCart>
    removeFromCart(cart: object, id: number): Promise<ISessionCart>
}