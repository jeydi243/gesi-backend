import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Course } from './schemas/course.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  async create(createCourseDto: CreateCourseDto) {
    const student = new this.courseModel(createCourseDto);
    return student.save();
  }

  async updateDefaultCourseImage(courseID: string, resource_id: string): Promise<boolean | string> {
    try {
      const resp = await this.courseModel.findOneAndUpdate({ id: courseID }, { $set: { profile_image: resource_id } }).exec();
      if (!resp) return `Aucun employee avec l'ID ${courseID}`;
      if (resp['profile_image'] != null) return resp['profile_image'] != null;
    } catch (error) {
      console.log(error);
      return error['message'];
    }
  }

  async setDefaultCourseImage(courseID: string, resourceID: string): Promise<boolean> {
    try {
      const resp1 = await this.courseModel.findOneAndUpdate({ id: courseID, images: { $elemMatch: { default: true } } }, { $set: { 'images.$.default': false } }).exec();
      const resp = await this.courseModel.findOneAndUpdate({ id: courseID, images: { $elemMatch: { id: resourceID } } }, { $set: { 'images.$.default': true } }).exec();
    } catch (error) {}
    return false;
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }
  findByAuthor(author: Types.ObjectId) {
    return this.courseModel.find({ author: author });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ id }, updateCourseDto);
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
