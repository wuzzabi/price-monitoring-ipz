import { Request, Response, NextFunction } from 'express'
import AuthService from '@services/auth.service'
import HttpException from '@exceptions/HttpException'

export default class AuthController {
    public authService = new AuthService() 

    constructor() {}

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body
        const { host } = req.headers

        try {
            const result = await this.authService.signup(userData, host)
            res.status(201).json({ data: result })
        } catch(error) {
            next(error)
        }
    }

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body

        try {
            const result = await this.authService.login(userData)
            req.session = Object.assign(req.session, result.session)
            res.status(200).json({ data: req.session })
        } catch(error) {
            next(error)
        }
    }

    public logOut = async (req:Request, res: Response, next: NextFunction) => {
        if(!req.session?.loggedin) throw new HttpException(400, 'You need to login first.')

        req.session.destroy()
        res.redirect(`/callback?message=Successfully signed out.`)
    }

    public session = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(req.session)
    }

    public VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, hash } = req.query

        try {
            const result = await this.authService.verifyUser(email, hash)
            result === true ? res.redirect('/callback?message=Email verified successfully. You can sign in now.') : res.redirect(`/callback?message=${result}`)
        } catch(error) {
            next(error)
        }
    }

    public ChangePassword = async (req: Request, res: Response, next: NextFunction) => {
        const userData: object = req.body

        try {
            const result = await this.authService.changePassword(userData)
            res.status(200).json({ message: 'New password has been sent to the mail.' })
        } catch(error) {
            next(error)
        }
    }
}