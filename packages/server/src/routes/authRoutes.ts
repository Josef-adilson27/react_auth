import express from 'express';
import { AuthController } from '../controllers/authController';
export const authRouter = express.Router()

authRouter.post('/register', AuthController.createUser)
authRouter.post('/login', AuthController.loginUser)
authRouter.post('/logout', AuthController.logout)