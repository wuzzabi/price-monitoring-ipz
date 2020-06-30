import * as sequelize from 'sequelize'
import 'dotenv/config'

export default class Database {
    private db: string
    private user: string
    private password: string
    private host: string
    private port: number
    private maxpool: number
    private minpool: number
    public database: sequelize.Sequelize

    constructor() {
        this.db = process.env.DBNAME
        this.user = process.env.DBUSER
        this.password = process.env.DBPASSWORD
        this.host = process.env.DBHOST
        this.port = Number(process.env.DBPORT)
        this.maxpool = Number(process.env.DBMAXPOOL)
        this.minpool = Number(process.env.DBMINPOOL)

        this.database = new sequelize.Sequelize(this.db, this.user, this.password, {
            host: this.host,
            port: this.port,
            timezone: '+03:00',
            dialect: 'mysql',
            define: {
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            },
            pool: {
                min: this.minpool,
                max: this.maxpool,
                idle: 10000,
                acquire: 30000,
            },
            logging: false,
        })

        this.database.authenticate()
        // .then(() => console.log('Connection has been established successfully'))
        .catch((err: Error) => {
            console.error('Unable to connect to database: ', err)
        })

        this.database.sync({
            // Use force to drop tables if exists
            // force: true
        })
    }

}