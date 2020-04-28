import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IUnit from '@interfaces/units.inerface'

let dbInstance = new Database().database

export const Units: sequelize.Model<IUnit, {}> = dbInstance.define<IUnit, {}>('Units', {
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