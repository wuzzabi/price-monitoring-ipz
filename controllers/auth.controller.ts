import { Request, Response, NextFunction } from 'express'
import AuthService from '@services/auth.service'
import HttpException from '@exceptions/HttpException'

export default class AuthController {
    public authService = new AuthService() 

    constructor() {}

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body

        try {
            const result = await this.authService.signup(userData)
            res.status(201).json({ result: result })
        } catch(error) {
            next(error)
        }
    }

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body

        try {
            const result = await this.authService.login(userData)
            res.session = Object.assign(req.session, result.session)
            res.status(200).json({ result: req.session })
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
}