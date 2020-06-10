import App from './app'
import AuthRoute from '@routes/auth.route'
import CartRoute from '@routes/cart.route'
import CartSetRoute from '@routes/cartset.route'

const app = new App([
    new AuthRoute,
    new CartRoute,
    new CartSetRoute
])

app.listen()