const User = require("../models/user")

module.exports = class UserInfoController {
    constructor() {}
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
    static async createUser(req, res)
    {   
        try {
            let newUser =  await User.create({
                'login': req.body.login,
                'password': req.body.password
            })
        } catch (error) {           
            return res.status(500).json(error.errors)
        }
        return res.status(200).json({
            "message" : "user created successfuly"
        })
    }
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
    static async getUserInfo (req, res)
    {        
        if (req.params.id) {
            let id = req.params.id
            let user = await User.findByPk(id,);
            return res.status(200).json(user);
        } else {
            return res.status(204).errored()
        }
    }
/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
    static async updateUserInfo(req, res)
    {
        console.log(res);
        
        if (!req.body.id) {

            return res.json
        }
        try {
            
        } catch (error) {
            
        }
    }
}