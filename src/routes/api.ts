import express, { Request, Response } from 'express';
import UserInfoController from '../contorllers/UserInfoController';
const router = express.Router()

router.post('/user/create', (req: Request, res: Response) => {UserInfoController.createUser(req, res)});
router.get('/user/:id', (req, res)=>{UserInfoController.getUserInfo(req, res)});
router.post('/user/update/:id', (req, res) => {UserInfoController.updateUserInfo(req, res)})
export default  router;