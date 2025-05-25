import { Request, Response, NextFunction } from 'express';
import OAuthToken from '../models/oauth_token';
import User from '../models/user';

export async function oauth2AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Требуется access_token' });
    }
    const accessToken = authHeader.split(' ')[1];
    const tokenRecord = await OAuthToken.findOne({ where: { accessToken } });
    if (!tokenRecord) {
        return res.status(401).json({ error: 'Неверный access_token' });
    }
    if (new Date() > tokenRecord.getDataValue('expiresAt')) {
        return res.status(401).json({ error: 'access_token истёк' });
    }
    // Можно добавить пользователя в req.user
    const user = await User.findByPk(tokenRecord.getDataValue('userId'));
    if (!user) {
        return res.status(401).json({ error: 'Пользователь не найден' });
    }
    (req as any).user = user;
    next();
}
