import 'module-alias/register'
import * as express from 'express'
import * as session from 'express-session'
import * as helmet from 'helmet'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import * as hpp from 'hpp'
import authMiddleware from '@middlewares/auth.middleware'
import { User } from '@models/user.model'
import AuthRoute from '@routes/auth.route'
import CartRoute from '@routes/cart.route'
import 'dotenv/config'

class Server {

    public app: express.Application

    constructor() {

        this.app = express()

        this.initializeMiddlewares()
        this.initializeRouting()
    }

    private initializeMiddlewares(): void {

        // Setup common security protection
        this.app.use(helmet())

        // Setup requests gzip compression
        this.app.use(compression())

        // Session settings
        this.app.use(session({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            cookie: { maxAge: 8 * 60 * 60 * 1000 },  // 8 hours
            saveUninitialized: false
          }))
          
        // Setup requests format parsing (Only JSON requests will be valid)
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())

        // Middleware to protect against HTTP Parameter Pollution attacks
        this.app.use(hpp())
    }

    private initializeRouting(): void {

        this.app.use('/', new AuthRoute().router)
        this.app.use('/', new CartRoute().router)
    }

    public listen() {
        
        // Start listening on the specified Port 
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is listening PORT 3000`)
        })
    }
}

const app: Server = new Server
app.listen()