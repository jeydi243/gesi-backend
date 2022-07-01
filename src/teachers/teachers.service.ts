import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './schemas/teacher.schema';

@Injectable()
export class TeachersService {
  constructor(@InjectModel('Teacher') private teacherModel: Model<Teacher>) {}
  async create(createProfessorDto: CreateTeacherDto) {
    try {
      const prof = await new this.teacherModel(createProfessorDto);
      return prof.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  findAll() {
    return this.teacherModel.find();
  }
  findById(id: string) {
    return this.teacherModel.findById(id).$where('this.isDeleted == false').exec();
  }
  findWhere(where: UpdateTeacherDto) {
    return this.teacherModel.find(where).$where('this.isDeleted == false').exec();
  }
  async updateById(id: string, updateProfessorDto: UpdateTeacherDto): Promise<Teacher | null> {
    try {
      const isNotDeleted: boolean = await this.teacherModel.exists({ _id: id, isDeleted: false });
      if (isNotDeleted) return this.teacherModel.findByIdAndUpdate(id, updateProfessorDto);
      return null;
    } catch (error) {
      return null;
    }
  }
  async updateWhere(where: UpdateTeacherDto, fieldsToUpdate: UpdateTeacherDto): Promise<Teacher | null> {
    try {
      const isNotDeleted: boolean = await this.teacherModel.exists({ ...where, isDeleted: false });
      if (isNotDeleted) {
        const updateresult = await this.teacherModel.updateMany(where, fieldsToUpdate);
        if (updateresult.modifiedCount != 0) {
          return this.teacherModel.findOne({ ...where, isDeleted: false });
        }
      }
      return null;
    } catch (error) {
      return error;
    }
  }
  //delete by id
  deleteById(id: string) {
    return this.teacherModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() });
  }
  //delete where some condition are meet
  deleteWhere(where: UpdateTeacherDto) {
    return this.teacherModel.findOneAndUpdate(where, { isDeleted: true, deletedAt: new Date() });
  }
}
