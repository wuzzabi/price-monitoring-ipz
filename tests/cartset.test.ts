import * as request from 'supertest'
import App from '../app'
import CartSetRoute from '@routes/cartset.route'

describe('Testing CartSets', () => {
    describe('[GET] /cartset/:id', () => {
        it('response statusCode 409', () => {
            const cartSetId = 404
            const cartSetRoute = new CartSetRoute
            const app = new App([cartSetRoute])

            return request(app.getServer())
            .get(`${cartSetRoute.path}/${cartSetId}`)
            .expect(409)
        })
    })
})