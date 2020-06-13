import * as request from 'supertest'
import App from '../app'
import ProductRoute from '@routes/product.route'

after(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
})

describe('##Testing Products', () => {
    describe('###[POST] /products/create', () => {
        it('should return the created product successfully', () => {
            const productRoute= new ProductRoute
            const data = {
                name: 'Banana',
                url_img: 'banana_link',
                unit_id: 1,
                category_id: 1
            }
            const app = new App([productRoute])

            return request(app.getServer())
            .post(`${productRoute.path}/create`)
            .send(data)
            .expect(201)
        })
    })
})