import 'module-alias/register'
import * as express from 'express'
import * as session from 'express-session'
import * as helmet from 'helmet'
import * as compression from 'compression'
import * as bodyParser from 'body-parser'
import * as hpp from 'hpp'
import IRoute from '@interfaces/routes.interface'
import errorMiddleware from '@middlewares/error.middleware'
import 'dotenv/config'

class App {

    public app: express.Application

    constructor(routes: IRoute[]) {

        this.app = express()

        this.initializeMiddlewares()
        this.initializeRouting(routes)
        this.initializeErrorHandling()
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

    private initializeRouting(routes: IRoute[]): void {

        routes.forEach((route) => {
            this.app.use('/', route.router)
        })
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    public listen() {
        
        // Start listening on the specified Port 
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is listening PORT 3000`)
        })
    }

    public getServer() {
        return this.app
    }
}

export default App