
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        // 1. Проверка аутентификации через сессию
        if (req.session.userId) {
            const user = await User.findByPk(req.session.userId);
            if (user) {
                req.user = user;
                return next();
            }
        }

        // 2. Проверка аутентификации через "Запомнить меня"
        const rememberToken = req.cookies.rememberToken;
        if (rememberToken) {
            const user = await User.findOne({ where: { rememberToken } });
            if (user) {
                // Обновление сессии
                req.session.userId = user.id;
                req.user = user;
                return next();
            }
        }

        // 3. Пользователь не аутентифицирован
        return res.status(401).json({ error: 'Unauthorized' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}