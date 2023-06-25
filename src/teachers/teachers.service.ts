import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDTO } from './dto/create-teacher.dto';
import { UpdateTeacherDTO } from './dto/update-teacher.dto';
import { Teacher } from './schemas/teacher.schema';

@Injectable()
export class TeachersService {
  constructor(@InjectModel('Teacher') private teacherModel: Model<Teacher>) {}
  async create(createProfessorDTO: CreateTeacherDTO) {
    try {
      const prof = await new this.teacherModel(createProfessorDTO);
      return prof.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProfileImage(teacherID: string, resource_id: string): Promise<boolean | string> {
    try {
      const resp = await this.teacherModel.findOneAndUpdate({ id: teacherID }, { $set: { profile_image: resource_id } }).exec();
      if (!resp) return `No teacher with ID ${teacherID}`;
      if (resp['profile_image'] != null) return resp['profile_image'] != null;
    } catch (error) {
      console.log(error);
      return error['message'];
    }
  }

  findAll() {
    return this.teacherModel.find();
  }
  findById(id: string) {
    return this.teacherModel.findById(id).$where('this.isDeleted == false').exec();
  }
  findWhere(where: UpdateTeacherDTO) {
    return this.teacherModel.find(where).$where('this.isDeleted == false').exec();
  }
  async updateById(id: string, updateProfessorDTO: UpdateTeacherDTO): Promise<Teacher | null> {
    try {
      const isNotDeleted: any = await this.teacherModel.exists({ _id: id, isDeleted: false });
      if (isNotDeleted) return this.teacherModel.findByIdAndUpdate(id, updateProfessorDTO);
      return null;
    } catch (error) {
      return null;
    }
  }
  async updateWhere(where: UpdateTeacherDTO, fieldsToUpdate: UpdateTeacherDTO): Promise<Teacher | null> {
    try {
      const isNotDeleted: any = await this.teacherModel.exists({ ...where, isDeleted: false });
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
  deleteWhere(where: UpdateTeacherDTO) {
    return this.teacherModel.findOneAndUpdate(where, { isDeleted: true, deletedAt: new Date() });
  }
}
