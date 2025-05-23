import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export default class CSRF {
    static generateToken(req: Request, res: Response, next: NextFunction) {
        const token: string = crypto.randomBytes(32).toString("hex");
        res.cookie("csrf-token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 24,
        });
        res.locals.csrfToken = token;
        next();
    }

    static validate(req: Request, res: Response, next: NextFunction)
    {
        const cookieToken = req.cookies["csrf-token"];
        const headerToken = req.headers["x-csrf-token"];

        if (!cookieToken || !headerToken || cookieToken !== headerToken) {
            return res.status(403).json({ error: "Invalid CSRF token соси жопу!" });
        }
        next();
    }
}
