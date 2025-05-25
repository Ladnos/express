import { Request, Response } from "express"
import crypto from 'crypto';

import User from "../models/user"
import Authintication from "../helpers/Authintication"
import OAuthToken from '../models/oauth_token';

export default class UserInfoController {
    constructor() {}

    static async createUser(req: Request, res: Response)
    {   
        try {
            let newUser =  await User.create({
                'login': req.body.login,
                'password': req.body.password
            })
        } catch (error) {           
        }
        return res.status(200).json({
            "message" : "user created successfuly"
        })
    }
    static async getUserInfo (req: Request, res: Response)
    {       
        console.log(req.cookies);
        
        if (req.params.id) {
            let id = req.params.id
            let user = await User.findByPk(id);
            let auth = new Authintication()
            return res.status(200).json(user);
        } else {
        }
    }
    static async updateUserInfo(req: Request, res: Response)
    {
        let {body} = req
            res.json(body)
        if (!body.id) {
            return res.json
        }
        try {
        
        } catch (error) {
            
        }
    }
    static async authUser(req:Request, res:Response)
    {
        let user: User | null = await User.findOne({where:{'login': req.body.login}})
        if (user) {
            // Генерируем access и refresh токены
            const accessToken = crypto.randomBytes(32).toString('hex');
            const refreshToken = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 час

            // Сохраняем токены в БД
            await OAuthToken.create({
                userId: user.getDataValue('id'),
                accessToken,
                refreshToken,
                expiresAt
            });

            res.json({
                access_token: accessToken,
                token_type: 'Bearer',
                expires_in: 3600,
                refresh_token: refreshToken
            });
        }else{
            res.status(401).json({"error": "Неправильный логин или пароль"})            
        }
    }
}