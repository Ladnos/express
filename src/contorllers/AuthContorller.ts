import { Request, Response } from 'express';
import User from '../models/user';
import crypto from 'crypto';
declare module 'express-session' {
  interface SessionData {
    userId: number; // или string, в зависимости от типа вашего ID
  }
}
class AuthController {
    // Вход пользователя
    async login(req: Request, res: Response) {
        try {
            const { login, password, rememberMe } = req.body;
            console.log(login, password, rememberMe);
            
            // Поиск пользователя
            const user = await User.findOne({ where: { login } });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Проверка пароля
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Создание сессии
            console.log(req.session);
            
            req.session.userId = user.id

            if (rememberMe) {
                // Режим "Запомнить меня"
                const rememberToken = await user.generateRememberToken();
                
                // Установка долгоживущей куки
                res.cookie('rememberToken', rememberToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                    sameSite: 'lax'
                });
            }

            return res.json({ 
                success: true,
                user: {
                    id: user.id,
                    login: user.login
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Выход пользователя
    async logout(req: Request, res: Response) {
        try {
            // Очистка сессии
            req.session.destroy(async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Logout failed' });
                }
                // Очистка куки
                res.clearCookie('rememberToken');
                res.clearCookie('connect.sid'); // Кука сессии

                return res.json({ success: true });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AuthController();