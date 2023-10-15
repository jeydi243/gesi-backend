import { Injectable } from '@nestjs/common';
import StudentServiceDTO from '../dto/student-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class StudentService {
  constructor(@InjectModel('StudentService') private studentService: Model<StudentService>) {
    studentService.watch().on('change', function (data) {
      log('You add nkdjfisjdf %s', data);
    });
  }
  async addService(service: StudentServiceDTO) {
    try {
      const createdService = new this.studentService(service);
    } catch (error) {}
  }
}
