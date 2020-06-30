import * as request from 'supertest'
import App from '../app'
import ProductRoute from '@routes/product.route'
import { Products } from '@models/products.model'
import IProduct from '@interfaces/products.interface'

after(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
})

describe('##Testing Products', () => {
    describe('###[POST] /products/create', () => {
        it('should return the product already exists', () => {
            const productRoute = new ProductRoute
            const data: object = {
                name: 'Banana',
                url_img: 'banana_link',
                unit_id: 1,
                category_id: 1
            }
            const app = new App([productRoute])

            return request(app.getServer())
            .post(`${productRoute.path}/create`)
            .send(data)
            .expect(409, { message: 'Product already exists!' })
        })

        // it('should return the created product successfully', () => {
        //     const productRoute = new ProductRoute
        //     const data: object = {
        //         name: 'cloth',
        //         url_img: 'cloth_link',
        //         unit_id: 1,
        //         category_id: 1
        //     }
        //     const app = new App([productRoute])

        //     return request(app.getServer())
        //     .post(`${productRoute.path}/create`)
        //     .send(data)
        //     .expect(201, { message: 'Product successfully created.' })
        // })
    })

    describe('###[GET] /products/:id', () => {
        it('should return all products by category', async () => {
            const productRoute = new ProductRoute
            const categoryId: number = 1
            const app = new App([productRoute])

            return request(app.getServer())
            .get(`${productRoute.path}/${categoryId}`)
            .expect(200)
        })
    })
})