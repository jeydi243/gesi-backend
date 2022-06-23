import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, Schema as S } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  async create(createCourseDto: CreateCourseDto) {
    const student = new this.courseModel(createCourseDto);
    return student.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }
  findByAuthor(author: S.Types.ObjectId) {
    return this.courseModel.find({ author: author });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ id }, updateCourseDto);
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
