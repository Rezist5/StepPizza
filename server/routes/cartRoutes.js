const Router = require('express');
const router = new Router();
const CartController = require('../controllers/CartController');
const checkAuth = require('../middleware/checkAuthMiddleware');

router.post('/', checkAuth, CartController.createCart);

router.post('/add', checkAuth, CartController.addToCart);

router.get('/:cartId', checkAuth, CartController.getCartItems);

router.put('/update', checkAuth, CartController.updateCartItem);

router.delete('/remove/:cartItemId', checkAuth, CartController.removeCartItem);

router.delete('/clear/:cartId', checkAuth, CartController.clearCart);

router.get('/active/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ where: { userId, status: 'active' } });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
});

module.exports = router;
