import App from './app'
import AuthRoute from '@routes/auth.route'
import CartRoute from '@routes/cart.route'
import CartSetRoute from '@routes/cartset.route'
import ProductRoute from '@routes/product.route'

const app = new App([
    new AuthRoute,
    new CartRoute,
    new CartSetRoute,
    new ProductRoute
])

app.listen()