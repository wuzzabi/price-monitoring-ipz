export default interface IUser {
    readonly id?: number,
    readonly email?: string,
    readonly password?: string,
    readonly verified?: boolean,
    readonly role_id?: number,
    readonly balance?: number,
    readonly regTime?: Date,
    readonly IP?: string
}