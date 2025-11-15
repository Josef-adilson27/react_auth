import BaseRepository from "./baseMongoRepository";
import User from "../models/User";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async findByEmail(email: string) {
    return await this.model.findOne({ email });
  }
  async findActiveUsers() {
    return await this.model.find();
  }
  async updateUserProfile(userId: number, profileData: any) {
    
  }
}

