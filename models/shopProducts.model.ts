import Database from '@models/index.model'
import * as sequelize from 'sequelize'
import IShopProduct from '@interfaces/shopProduct.interface'
import { Shops } from '@models/shops.model'
import { Products } from '@models/products.model'

let dbInstance = new Database().database

export const ShopProducts: sequelize.Model<IShopProduct, {}> = dbInstance.define<IShopProduct, {}>('ShopProducts', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: sequelize.DECIMAL(9, 2),
        allowNull: false,
        defaultValue: 0.00,

    },
    shop_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    product_id: {
        type: sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

ShopProducts.belongsTo(Shops, {foreignKey: 'shop_id'})
ShopProducts.belongsTo(Products, {foreignKey: 'product_id'})