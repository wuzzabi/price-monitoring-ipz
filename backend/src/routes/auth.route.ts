const Router = require('express').Router()
import AuthController from '@controllers/auth.controller'
import IRoute from '@interfaces/routes.interface'

export default class AuthRoute implements IRoute {
    public path = '/auth'
    public router = Router
    public authController = new AuthController()

    constructor() {

        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, this.authController.signUp)
        this.router.post(`${this.path}/login`, this.authController.logIn)
        this.router.post(`${this.path}/changePassword`, this.authController.ChangePassword)
        this.router.get(`${this.path}/verify`, this.authController.VerifyUser)
        this.router.get(`${this.path}/logout`, this.authController.logOut)
        this.router.get(`${this.path}/session`, this.authController.session)
    }
}