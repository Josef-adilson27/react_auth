import express from 'express';
import { AuthController } from '../controllers/authController';
export const authRouter = express.Router()

const authController = new AuthController()
authRouter.post('/auth/register', authController.registerUser)
authRouter.post('/auth/login', authController.loginUser)
authRouter.post('/auth/logout', authController.logout)