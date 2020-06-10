import * as request from 'supertest'
import App from '../app'
import CartSetRoute from '@routes/cartset.route'

after(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
})

describe('Testing CartSets', () => {
    describe('[GET] /cartset/:id', () => {
        it('response statusCode 409 / findOne', () => {
            const cartSetId = 404
            const cartSetRoute = new CartSetRoute
            const app = new App([cartSetRoute])

            return request(app.getServer())
            .get(`${cartSetRoute.path}/${cartSetId}`)
            .expect(409, { message: 'No such cart set in the DB.' })
        })

        it('response statusCode 200', () => {
            const cartSetId = 1
            const cartSetRoute = new CartSetRoute
            const app = new App([cartSetRoute])

            return request(app.getServer())
            .get(`${cartSetRoute.path}/${cartSetId}`)
            .expect(200)
        })
    })
})