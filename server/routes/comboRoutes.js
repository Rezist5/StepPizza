const Router = require('express');
const router = new Router();
const ComboController = require('../controllers/ComboController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/combo', checkRole('ADMIN'), ComboController.createCombo);
router.get('/combo/:id', ComboController.getCombo);
router.get('/combos', ComboController.getCombos);
router.delete('/combo/:id', checkRole('ADMIN'), ComboController.deleteCombo);

module.exports = router;
