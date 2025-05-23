import { Request, Response } from "express";
import CSRF from "../middleware/CSRF";
import User from "../models/user";
import {compare} from 'bcrypt-ts';
import crypro from 'crypto'

interface rememberMe {
    req: Request,
    res: Response
}

class Authintication extends CSRF
{
    constructor(private user: User) { super() }
    async checkPass(password: string): Promise<boolean>
    {
        const isMatch: boolean = await compare(password, this.user.getDataValue('password'));
        return isMatch;
    }

    private async auth(password: string, rememberMe?: rememberMe):Promise<boolean | Error>
    {
        if (await this.auth(password)) {
            if (rememberMe) {
                await this.authWithRemember(rememberMe)
            }
            return true
        }
        else
        {
            return Error('test')

        }
    }

    private async authWithRemember(rememberMe: rememberMe): Promise<void>
    {
        const rememberToken = crypro.randomBytes(32).toString('hex');
        await this.user.update({ "remember_token":rememberToken });
        rememberMe.res.cookie('rememberToken', rememberToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    }
}
export default Authintication