
import  { Model } from 'mongoose';

class BaseRepository<T extends typeof Model> {
  
  model: T

  constructor(model: any) {
    this.model = model;
  }
  
  async create(userDto: any) {
    return await this.model.create(userDto)
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id: number) {
    return await this.model.findById(id);
  }


  async update(id: number, data: any) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: any) {
    return await this.model.findByIdAndDelete(id);
  }

}

export default BaseRepository;
