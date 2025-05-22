const express = require('express');
const UserInfoController = require('../contorllers/UserInfoController');
const router = express.Router()

router.post('/user/create', (req, res)=>UserInfoController.createUser(req, res));
router.get('/user/:id', (req, res)=>UserInfoController.getUserInfo(req, res));
router.get('/test', (req, res) => UserInfoController.test(req, res))
module.exports = router;