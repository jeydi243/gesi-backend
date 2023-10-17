import { Injectable } from '@nestjs/common';
import StudentServiceDTO from '../dto/student-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';
import { Types as T } from 'mongoose';
@Injectable()
export class StudentService {
  constructor(@InjectModel('StudentService') private studentService: Model<StudentService>) {
    // studentService.watch().on('change', function (data) {
    //   log('You add nkdjfisjdf %s', data);
    // });
  }
  async addService(service: StudentServiceDTO) {
    try {
      const createdService = new this.studentService(service);
      return createdService.save();
    } catch (error) {
      return null;
    }
  }
  async findOne(serviceID: string) {
    try {
      return this.studentService.findOne({ id: serviceID, deleteAt: null }).exec();
    } catch (error) {
      return null;
    }
  }
  async update(serviceID: string, updatedService: Partial<StudentServiceDTO>) {
    try {
      const result = await this.studentService.findOneAndUpdate({ id: serviceID, deleteAt: null }, { ...updatedService }).exec();
      // result.modifiedPaths
      return result.isModified();
    } catch (error) {
      return null;
    }
  }
  async findAllServices(): Promise<any[]> {
    //return all documents that is not marked as deletedAt
    return this.studentService.find({ deletedAt: null }).exec();
  }

  async softdeleteService(serviceID: string) {
    const result = await this.studentService.findOneAndUpdate({ id: serviceID }, { deletedAt: new Date() }).exec();
    // result.getChanges();
    return result.isModified('deletedAt');
  }
}
