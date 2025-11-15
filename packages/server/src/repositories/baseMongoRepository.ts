import userModel from '../models/User';
 
class BaseRepository {
  model: typeof userModel;
  constructor(model: any) {
    this.model = model;
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id:number) {
    return await this.model.findById(id);
  }

  async create(data:any) {
    return await this.model.create(data);
  }

  async update(id:number, data:any) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id:any) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default  BaseRepository;
