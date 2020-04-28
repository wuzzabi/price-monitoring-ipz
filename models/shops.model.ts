import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IShop from '@interfaces/shops.interface'

let dbInstance = new Database().database

export const Shops: sequelize.Model<IShop, {}> = dbInstance.define<IShop, {}>('Shops', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    urlImg: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})