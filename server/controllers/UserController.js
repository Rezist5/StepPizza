const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BlacklistedToken } = require('../models/models');
const User = require('../models/User');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async getName (req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            console.log(user.Fullname)
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            return res.json(user.Fullname);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async registration(req, res, next) {
        const { email, password, Fullname } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const role = 'USER';
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, Fullname , password: hashPassword , role});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async createAdmin(req, res, next) {
        try {
            const { email, password, Fullname } = req.body;
            console.log(email, password, Fullname )
            if (!email || !password || !Fullname) {
                return next(ApiError.badRequest('Некорректные данные'));
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const admin = await User.create({
                email,
                password: hashPassword,
                Fullname,
                role: 'ADMIN' 
            });

            return res.json({ message: 'Администратор успешно создан', admin });
        } catch (error) {
            next(error);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            if (!req.file) {
                return next(ApiError.badRequest('Файл не найден'));
            }

            const user = await User.findByPk(req.user.id);  

            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            const avatarPath = `/static/avatars/${req.file.filename}`;
            
            user.avatar = avatarPath;  
            await user.save();

            return res.json({ message: 'Аватар успешно загружен', avatarPath });
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async check(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            return res.json({ token });
        } catch (error) {
            return res.status(401).json({ message: 'Ошибка аутентификации: ' + error.message });
        }
    }
    
    async logout(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]; 
            await BlacklistedToken.create({ token }); 
            return res.json({ message: 'Вы успешно вышли из системы' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();