import { Request, Response } from "express";
import AuthService from "../services/authService";
import { CreateUserDTOClass } from "../dtos/userDto";

export class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const dto = CreateUserDTOClass.validate(req.body);
      
      const user = await this.authService.createUser({
        name: dto.name,
        email: dto.email,
        password: dto.password,
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
    //  authService.loginUser()
  }
  logout(req: Request, res: Response) {
    //  authService.logout()
  }

}
