import express, { Request, Response } from 'express';
import UserInfoController from '../contorllers/UserInfoController';
import { oauth2AuthMiddleware } from '../middleware/oauth2Auth';
const router = express.Router()

router.post('/user/create', (req: Request, res: Response) => {UserInfoController.createUser(req, res)});
router.get('/user/:id', oauth2AuthMiddleware, (req, res)=>{UserInfoController.getUserInfo(req, res)});
router.post('/user/update/:id', oauth2AuthMiddleware, (req, res) => {UserInfoController.updateUserInfo(req, res)})
router.post('/user/auth', (req, res) => {UserInfoController.authUser(req, res)})
export default  router;