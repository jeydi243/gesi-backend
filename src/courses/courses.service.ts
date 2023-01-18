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

  async addCourseImage(courseID: string, resourceIDs: string | string[], setDefault = false): Promise<Record<string, any>> {
    let wasdefaulted = false;
    let message = '';
    try {
      let objList: any = Array.isArray(resourceIDs) ? resourceIDs : [resourceIDs];

      objList = objList.map(id => {
        return { id, default: false };
      });

      const resp = await this.courseModel.findOneAndUpdate({ id: courseID }, { $push: { images: { $each: [...objList] } } }).exec();
      if (!Array.isArray(resourceIDs) && setDefault && resp) {
        wasdefaulted = await this.setDefaultCourseImage(courseID, resourceIDs);
      }
      if (!resp) message = `No course with ID ${courseID}`;
      if (resp.images.findIndex(el => el.id === resourceIDs) != -1) message = 'The image was added to course images';
      return { message, wasdefaulted };
    } catch (error) {
      console.log(error);
      return { ...error };
    }
  }

  async setDefaultCourseImage(courseID: string, resourceID: string): Promise<boolean> {
    try {
      const resp1 = await this.courseModel.findOneAndUpdate({ id: courseID, images: { $elemMatch: { default: true } } }, { $set: { 'images.$.default': false } }).exec();
      const resp = await this.courseModel.findOneAndUpdate({ id: courseID, images: { $elemMatch: { id: resourceID } } }, { $set: { 'images.$.default': true } }).exec();
      const id_old_default = resp1.images.find(el => el['default'] === true)['id'];
      const id_new_default = resp.images.find(el => el['default'] === true)['id'];
      console.log({ id_old_default }, { id_new_default });

      return id_old_default != id_new_default;
    } catch (error) {
      console.log(error);

      return false;
    }
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
