import UserRepository from "../repositories/userRepository";
import { CreateUserDTOClass } from "../dtos/userDto";
import { PasswordService } from "./passwordService";
import { JwtUtils, JwtUtilsFactory } from "../utils/jwt";
import { UserLoginDTOClass } from "../dtos/userLoginDto";
import { IUserDocument } from "../models/User";

class AuthService {
  repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(userDto: CreateUserDTOClass) {

    const isEmailExists = await this.repository.findByEmail(userDto.email);
    if (isEmailExists) {
      throw new Error("email already exists");
    }

    const jwtUtils = JwtUtilsFactory.create(process.env.JWT_SECRET as string);
    const refreshToken = jwtUtils.createRefreshToken({
      userEmail: userDto.email,
    }); /// need to save in db
    
    const accessToken = jwtUtils.sign({
      userEmail: userDto.email,
      username: userDto.name,
    });

    const user = await this.repository.create({
      name: userDto.name,
      email: userDto.email,
      password: await PasswordService.hash(userDto.password),
    });
    return { user, accessToken,refreshToken };

  }

  async loginUser(userDto: UserLoginDTOClass) {
    const loggedUser: IUserDocument | null = await this.repository.findByEmail(
      userDto.email,
    );

    if (!loggedUser) {
      throw new Error("user not found");
    }

    const isPasswordMatch = await PasswordService.compare(
      userDto.password,
      loggedUser.password,
    );

    if (!isPasswordMatch) {
      throw new Error("wrong password");
    }

    const jwtUtils = JwtUtilsFactory.create(process.env.JWT_SECRET as string);
    const refreshToken = jwtUtils.createRefreshToken({
      userEmail: userDto.email,
    });  /// need to save in db

    const accessToken =   jwtUtils.sign({
      userEmail: userDto.email,
      username: loggedUser.name,
    });

    return {
      userName: loggedUser.name,
      userEmail: loggedUser.email,
      accessToken,
      refreshToken
    };
  }

  async logout() {

    
  }
}

export default AuthService;
