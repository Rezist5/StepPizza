const Router = require('express');
const router = new Router();

const comboRoutes = require('./comboRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const userRoutes = require('./userRoutes');
const cityRoutes = require('./cityRoutes');

router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/combos', comboRoutes);
router.use('/user', userRoutes);
router.use('/city', cityRoutes);

module.exports = router;
