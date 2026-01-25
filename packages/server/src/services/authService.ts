import e, { Request, Response } from "express";
import UserRepository from "../repositories/userRepository";
import BaseRepository from "../repositories/baseMongoRepository";
import jwt from "jsonwebtoken";
import userModel from "./../models/User";
import { CreateUserDTOClass } from "../dtos/userDto";

class AuthService {

  repository: UserRepository
  
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(userDto: CreateUserDTOClass) {
    const isEmailExists = await this.repository.findByEmail(userDto.email)
    if(isEmailExists){
      throw new Error('email already exists')
    }
   return this.repository.create(userDto);
  }
 
  async loginUser() {

  }
 
  async logout() {

  }
}

export default AuthService;
