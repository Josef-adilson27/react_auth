import UserRepository from "../repositories/userRepository";
import { CreateUserDTOClass } from "../dtos/userDto";
import { PasswordService } from "./passwordService";
import { JwtUtils } from "../utils/jwt";

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

    const token = new JwtUtils(process.env.JWT_SECRET as string).sign({
      user: userDto.name,
    });

    const user = await this.repository.create({
      name: userDto.name,
      email: userDto.email,
      password: await PasswordService.hash(userDto.password),
    });
    return { user, token };

  }

  async loginUser() {}

  async logout() {}
}

export default AuthService;
