import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IProduct from '@interfaces/products.interface'
import { Categories } from '@models/categories.model'
import { Units } from '@models/units.model'

let dbInstance = new Database().database

export const Products: sequelize.Model<IProduct, {}> = dbInstance.define<IProduct, {}>('Products', {
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
    },
    category_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    unit_id: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

Products.belongsTo(Categories, {foreignKey: 'category_id'})
Products.belongsTo(Units, {foreignKey: 'unit_id'})