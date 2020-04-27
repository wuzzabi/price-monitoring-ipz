import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IUser from '@interfaces/user.interface'
import { Roles } from '@models/roles.model'

let dbInstance = new Database().database

export const User: sequelize.Model<IUser, {}> = dbInstance.define<IUser, {}>('User', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    verified: {
        type: sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    balance: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    regTime: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
    },
    IP: {
        type: sequelize.STRING
    },
    role_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: false
})

User.belongsTo(Roles, {foreignKey: 'role_id'})