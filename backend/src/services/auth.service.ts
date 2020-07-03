import * as bcrypt from 'bcrypt'
import * as Crypto from 'crypto'
import IUser from '@interfaces/user.interface'
import HttpException from '@exceptions/HttpException'
import { User } from '@models/user.model'
import MailService from './mail.service'
import { Roles } from '@models/roles.model'
import 'dotenv/config'

export default class AuthService {
    public mailService = new MailService()

    constructor() {}

    public async signup(userData: IUser, host: string): Promise<IUser> {
        const { email, password } = userData
        if(!(email && password)) throw new HttpException(400, 'Please enter email and password')

        const findUser: IUser = await User.findOne({ where: { email: email } })
        if(findUser) throw new HttpException(409, `User already exists with email ${email}`)

        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALTROUNDS))
        const createUserData: IUser = await User.create({ email: email, password: hashedPassword })

        const hashedEmailWithPassword: string = await bcrypt.hash(email + hashedPassword, Number(process.env.SALTROUNDS))
        const verificationUrl: string = `http://${host}/auth/verify?email=${email}&hash=${hashedEmailWithPassword}`
        const sendVerificationMail = await this.mailService.sendVerificationMail(email, verificationUrl)

        return createUserData
    }

    public async login(userData: IUser): Promise<{session: object, findUser: IUser}> {
        const { email, password } = userData
        if(!(email && password)) throw new HttpException(409, 'Please enter Email and Password!')

        const findUser: IUser = await User.findOne({
            where: { email: email },
            include: [{
                model: Roles,
                attributes: ['name']
            }]
        })
        if(!findUser) throw new HttpException(409, 'User not found!')

        const isPasswordMatching: boolean = await bcrypt.compare(password, findUser.password)
        if(!isPasswordMatching) throw new HttpException(409, 'Incorrect Password or Email!')

        const session = { loggedin: true, email: email, user_id: findUser.id, role: findUser.Role.name }
        return { session, findUser }
    }

    public async verifyUser(email: string, hash: string): Promise<boolean | string> {
        if(!(email && hash)) return 'Wrong query params!'

        const findUser: IUser = await User.findOne({ where: { email: email } })
        if(!findUser) return `User not found with email ${email}`

        const isEmailAndHashMatching: boolean = await bcrypt.compare(email + findUser.password, hash)
        if(!isEmailAndHashMatching) return 'Incorrect Email or Hash!'

        const updateUser = await User.update({ verified: true }, { where: { email: email }})
        
        return true
    }
    
    public async changePassword(userData: IUser): Promise<boolean> {
        const { email } = userData
        const findUser: IUser = await User.findOne({ where: { email: email } })
        if(!findUser) throw new HttpException(409, 'User is not registered with such email!')

        const generatedPassword: string = Crypto.randomBytes(16).toString('base64').slice(0, 16)
        const hashedPassword: string = await bcrypt.hash(generatedPassword, Number(process.env.SALTROUNDS))
        
        const updateUserData = await User.update({ password: hashedPassword }, { where: { email: email }})
        const sendNewPassword = await this.mailService.sendNewPassword(email, generatedPassword)

        return true
    }

}