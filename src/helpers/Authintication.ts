import { Request, Response } from "express";
import CSRF from "../middleware/CSRF";
import User from "../models/user";
import { compare } from 'bcrypt-ts';
import crypto from 'crypto';

interface express {
    req: Request,
    res: Response
}

class Authentication {

    static async checkPass(user: User, password: string): Promise<boolean> {
        const isMatch: boolean = await compare(password, user.getDataValue('password'));
        return isMatch;
    }

    static async auth(user: User, password: string, express: express): Promise<boolean> {
        if (await this.checkPass(user, password)) {
            await this.authWithRemember(user, express);
            express.res.json({ message: "Авторизация успешна", session: express.req.sessionID });
            return true;
        } else {
            express.res.status(401).json({"error": "Неправильный логин или пароль"})
            return false;
        }
    }
// blyaaa ya je api delau
    static async authWithRemember(user: User, express: express): Promise<void> {
        const rememberToken = crypto.randomBytes(32).toString('hex');
        await user.update({ "remember_token": rememberToken });
        express.res.cookie('rememberToken', rememberToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    }
}
export default Authentication;