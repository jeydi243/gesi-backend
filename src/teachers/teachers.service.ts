import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher, TeacherDocument } from './schemas/teacher.schema';

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teacher.name) private professorModel: Model<TeacherDocument>) {}
  async create(createProfessorDto: CreateTeacherDto) {
    try {
      const prof = await new this.professorModel(createProfessorDto);
      return prof.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  findAll() {
    return this.professorModel.find();
  }
  findById(id: string) {
    return this.professorModel.findById(id).$where('this.isDeleted == false').exec();
  }
  findWhere(where: UpdateTeacherDto) {
    return this.professorModel.find(where).$where('this.isDeleted == false').exec();
  }
  async updateById(id: string, updateProfessorDto: UpdateTeacherDto): Promise<TeacherDocument | null> {
    try {
      const isNotDeleted: boolean = await this.professorModel.exists({ _id: id, isDeleted: false });
      if (isNotDeleted) return this.professorModel.findByIdAndUpdate(id, updateProfessorDto);
      return null;
    } catch (error) {
      return null;
    }
  }
  async updateWhere(where: UpdateTeacherDto, fieldsToUpdate: UpdateTeacherDto): Promise<TeacherDocument | null> {
    try {
      const isNotDeleted: boolean = await this.professorModel.exists({ ...where, isDeleted: false });
      if (isNotDeleted) {
        const updateresult = await this.professorModel.updateMany(where, fieldsToUpdate);
        if (updateresult.modifiedCount != 0) {
          return this.professorModel.findOne({ ...where, isDeleted: false });
        }
      }
      return null;
    } catch (error) {
      return error;
    }
  }
  //delete by id
  deleteById(id: string) {
    return this.professorModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() });
  }
  //delete where some condition are meet
  deleteWhere(where: UpdateTeacherDto) {
    return this.professorModel.findOneAndUpdate(where, { isDeleted: true, deletedAt: new Date() });
  }
}
