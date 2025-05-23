import { Request, Response } from "express"

import User from "../models/user"
import Authintication from "../helpers/Authintication"

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
        if (req.params.id) {
            let id = req.params.id
            let user = await User.findByPk(id);
            let auth = new Authintication(user)
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
}