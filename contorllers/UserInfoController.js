const User = require("../models/user")
/** @type {import("express").RequestHandler} */
module.exports = class UserInfoController {
    constructor() {}

    static async createUser(req, res)
        {   
        try {
            let newUser =  await User.create({
                'login': req.body.login,
                'password': req.body.password
            })
        } catch (error) {
            return res.json(error.errors[0].message )
        }
        return res.json({
            "message" : "user created successfuly"
        })
    }

    static async getUserInfo (req, res)
    {
        let id = req.params.id

        let user = await User.findByPk(id,);
        return res.json(user);
    }

    static async updateUserInfo(req, res)
    {
        if (!req.body.id) {
            return res
        }
        try {
            
        } catch (error) {
            
        }
    }
}