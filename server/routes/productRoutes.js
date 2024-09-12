const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/ProductController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/product', checkRole('ADMIN'), ProductController.createProduct);
router.get('/product/:id', ProductController.getProduct);
router.get('/products', ProductController.getAllProducts);

module.exports = router;
