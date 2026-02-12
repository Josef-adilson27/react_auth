import { Request, Response } from "express";
import AuthService from "../services/authService";
import { CreateUserDTOClass } from "../dtos/userDto";
import { UserLoginDTOClass } from "../dtos/userLoginDto";
import { CookieService } from "../services/cookieService";

///добавить потом ит csrf token

export class AuthController {
  private authService: AuthService = new AuthService();
  private cookieService: CookieService = new CookieService();

  constructor() {}
  registerUser = async (req: Request, res: Response) => {
    try {
      const dto = CreateUserDTOClass.validate(req.body);

      const user = await this.authService.registerUser(dto);

      const cookies = this.cookieService.getAuthCookies({
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      });

      cookies.forEach((cookie) =>
        res.cookie(cookie.name, cookie.value, cookie.options),
      );

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.send({ succes: false, message: error.message });
      }
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const user = UserLoginDTOClass.validate(req.body);

      const loggedUser = await this.authService.loginUser(user);

      const cookies = this.cookieService.getAuthCookies({
        accessToken: loggedUser.accessToken,
        refreshToken: loggedUser.refreshToken,
      });

      cookies.forEach((cookie) =>
        res.cookie(cookie.name, cookie.value, cookie.options),
      );

      return res.status(200).json(loggedUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };

  logout(req: Request, res: Response) {
    try {

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: '/api',
      });
      
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/auth/refresh",
      });

      //authService.logout();
      res.json({success:true, message:'Logged out'});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          error: error.message,
        });
      }
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
  
}
