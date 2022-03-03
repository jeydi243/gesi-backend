import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private studentModel: Model<CourseDocument>) {}
  async create(createCourseDto: CreateCourseDto) {
    const student = new this.studentModel(createCourseDto);
    return student.save();
  }

  async findAll(): Promise<CourseDocument[]> {
    return this.studentModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }
  findByAuthor(idauthor: string) {
    return `This action returns a #${idauthor} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
