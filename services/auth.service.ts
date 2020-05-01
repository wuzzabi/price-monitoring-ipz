import * as bcrypt from 'bcrypt'
import IUser from '@interfaces/user.interface'
import HttpException from '@exceptions/HttpException'
import { User } from '@models/user.model'
import 'dotenv/config'

export default class AuthService {
    constructor() {}

    public async signup(userData: IUser): Promise<IUser> {
        const { email, password } = userData
        if(!(email && password)) throw new HttpException(400, 'Please enter email and password')

        const findUser: IUser = await User.findOne({ where: { email: email } })
        if(findUser) throw new HttpException(409, `User already exists with email ${email}`)

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALTROUNDS))
        const createUserData: IUser = await User.create({ email: email, password: hashedPassword })

        return createUserData
    }

    public async login(userData: IUser): Promise<{session: object, findUser: IUser}> {
        const { email, password } = userData
        if(!(email && password)) throw new HttpException(409, 'Please enter Email and Password!')

        const findUser: IUser = await User.findOne({ where: { email: email } })
        if(!findUser) throw new HttpException(409, 'User not found!')

        const isPasswordMatching: boolean = await bcrypt.compare(password, findUser.password)
        if(!isPasswordMatching) throw new HttpException(409, 'Incorrect Password or Email!')

        const session = { loggedin: true, email: email, user_id: findUser.id }
        return { session, findUser }
    }

}