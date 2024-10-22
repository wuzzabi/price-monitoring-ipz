import App from './app'
import AuthRoute from '@routes/auth.route'
import CartRoute from '@routes/cart.route'
import CartSetRoute from '@routes/cartset.route'
import ProductRoute from '@routes/product.route'
import ShopRoute from '@routes/shop.route'
import ShopProductsRoute from '@routes/shopproducts.route'

const app = new App([
    new AuthRoute,
    new CartRoute,
    new CartSetRoute,
    new ProductRoute,
    new ShopRoute,
    new ShopProductsRoute
])

app.listen()