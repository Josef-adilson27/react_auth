import express from 'express';
import { AuthController } from '../controllers/authController';
export const authRouter = express.Router()

const authController = new AuthController()
authRouter.post('/register', authController.createUser)
authRouter.post('/login', authController.loginUser)
authRouter.post('/logout', authController.logout)