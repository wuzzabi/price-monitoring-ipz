import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IRoles from '@interfaces/roles.interface'

let dbInstance = new Database().database

export const Roles: sequelize.Model<IRoles, {}> = dbInstance.define<IRoles, {}>('Roles', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})