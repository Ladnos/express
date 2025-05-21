const {User} = require("../models")

module.exports = class UserInfoController {
    constructor() {}

    static async createUser(req, res)
    {        
        let newUser =  await User.create({
            'login': req.body.login,
            'password': req.body.password
        })

        return res.json({
            "message" : "user created successfuly"
        })
    } 
}