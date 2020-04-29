import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import ICategory from '@interfaces/categories.interface'

let dbInstance = new Database().database

export const Categories: sequelize.Model<ICategory, {}> = dbInstance.define<ICategory, {}>('Categories', {
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
    url_img: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})