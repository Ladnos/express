const express = require('express');
const UserInfoController = require('../contorllers/UserInfoController');
const router = express.Router()

router.post('/', (req, res)=>UserInfoController.createUser(req, res));

module.exports = router;