const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');
const checkAuth = require('../middleware/checkAuthMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '..', 'static/avatars'));  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});
const upload = multer({ storage });

router.post('/registration', UserController.registration);  
router.post('/login', UserController.login);  
router.post('/logout', checkAuth, UserController.logout);  
router.get('/check', checkAuth, UserController.check);  

router.post('/admin', checkRole('ADMIN'), UserController.createAdmin);  
router.get('/name/:id', checkAuth, UserController.getName);  
router.post('/avatar',  upload.single('avatar'), UserController.uploadAvatar);  

module.exports = router;
