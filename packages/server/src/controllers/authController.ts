import { Request, Response } from "express";
import AuthService from "../services/authService";
import { CreateUserDTOClass } from "../dtos/userDto";
import { PasswordService } from "../services/passwordService";
import { JwtUtils } from "../utils/jwt";
import { UserLoginDTOClass } from "../dtos/userLoginDto";

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  registerUser = async (req: Request, res: Response) => {
    try {
      const dto = CreateUserDTOClass.validate(req.body);

      const {  user, token } = await this.authService.registerUser(dto);
        console.log(user, token);
        
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true если production;
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({
        success: true,
        data: user
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.send({ succes: false, message: error.message });
      }
    }
  };

  loginUser(req: Request, res: Response) {
     const dto = UserLoginDTOClass.validate(req.body);
    //  authService.loginUser()
  }

  logout(req: Request, res: Response) {
    //  authService.logout()
  }
}
