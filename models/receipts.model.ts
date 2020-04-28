import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IReceipt from '@interfaces/receipts.inteface'
import { User } from '@models/user.model'

let dbInstance = new Database().database

export const Receipts: sequelize.Model<IReceipt, {}> = dbInstance.define<IReceipt, {}>('Receipts', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    verified: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    urlImg: {
        type: sequelize.STRING,
        allowNull: false
    },
    uploadedTime: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

Receipts.belongsTo(User, {foreignKey: 'user_id'})