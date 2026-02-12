import BaseRepository from "./baseMongoRepository";
import userModel from "../models/User";

class UserRepository extends BaseRepository<typeof userModel> {
  constructor() {
    super(userModel);
  }
  async create(userDto: any) {
    return await this.model.create(userDto);
  }
  
  async findByEmail(email:string){
    return await this.model.findOne({email})
  }

  findAll(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
}
export default UserRepository;
