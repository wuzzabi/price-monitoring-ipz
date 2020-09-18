import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import ICartSet from '@interfaces/cartset.interface'
import { User } from './user.model'

let dbInstance = new Database().database

export const CartSets: sequelize.Model<ICartSet, {}> = dbInstance.define<ICartSet, {}>('CartSets', {
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
    productSet: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

CartSets.belongsTo(User, {foreignKey: 'user_id'})