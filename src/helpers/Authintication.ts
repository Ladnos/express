import { Request, Response } from "express";
import CSRF from "../middleware/CSRF";
import User from "../models/user";
import { compare } from 'bcrypt-ts';
import crypto from 'crypto';

interface express {
    req: Request,
    res: Response
}

class Authentication extends CSRF {

    async checkPass(user: User, password: string): Promise<boolean> {
        const isMatch: boolean = await compare(password, user.getDataValue('password'));
        return isMatch;
    }

    private async auth(user: User, password: string, express: express, rememberMe?: boolean): Promise<boolean> {
        if (await this.checkPass(user, password)) {
            if (express && rememberMe) {
                await this.authWithRemember(user, express);
            }
            express.req.session.userId = user.getDataValue('id');
            express.res.json({ message: "Авторизация успешна", session: express.req.sessionID });
            return true;
        } else {
            return false;
        }
    }
// blyaaa ya je api delau
    private async authWithRemember(user: User, express: express): Promise<void> {
        const rememberToken = crypto.randomBytes(32).toString('hex');
        await user.update({ "remember_token": rememberToken });
        express.res.cookie('rememberToken', rememberToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    }
}
export default Authentication;