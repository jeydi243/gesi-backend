import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, NativeError } from 'mongoose';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Responsable, ResponsableDocument } from './schemas/responsable.schema';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Responsable.name)
    private responsableModel: Model<ResponsableDocument>,
  ) {}
  async add(createStudentDto: CreateStudentDto): Promise<Student | void> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async findAll(): Promise<Student[] | any> {
    try {
      const students = await this.studentModel.find({});
      console.log('We found students:', students);
      return students;
    } catch (err) {
      console.log('Une erreur est survenue', err);
      return err;
    }
  }

  async findOne(id: string): Promise<Student | any> {
    return this.studentModel
      .findOne({ _id: id }, { name: 1, email: 1, telephone: 1, matricule: 1 })
      .then((student: StudentDocument) => {
        console.log('Find one student with id = ', student.id);
        return student;
      })
      .catch(err => {
        console.log("Can't find student with id = ", id, '\n', err);
        return err;
      });
    // return `This action returns a #${id} student`;
  }

  async updateOne(id: string, updateStudentDto: UpdateStudentDto) {
    // return this.studentModel.updateOne({ _id: id }, updateStudentDto);
    try {
      const student = await this.studentModel.findByIdAndUpdate({ _id: id }, updateStudentDto, {
        new: true,
        returnDocument: 'after',
        lean: true,
      });
      console.log('The student has been updated: ', student);
      return student;
    } catch (err) {
      console.error(err.message);
      return err;
    }
  }

  remove(id: string) {
    this.studentModel.findByIdAndRemove({ _id: id }, function (err: NativeError, student: Student) {
      if (err) {
        console.error(err.message);
        return { error: err.message };
      }
      console.log('The student has been deleted:', student);
      return true;
    });
  }
  async addResponsable(idStudent: string, respoDto: CreateResponsableDto) {
    const createdResponsable = new this.responsableModel(respoDto);
    // this.studentModel
    //   .findByIdAndUpdate(
    //     { _id: idStudent },
    //     { $push: { responsables: createdResponsable } },
    //     { new: true },
    //   )
    //   .then((results) => {
    //     console.log(results);
    //   })
    //   .catch((err) => {
    //     console.error(err.message);
    //   });
    return createdResponsable
      .save()
      .then(result => {
        console.log(result);
        return this.studentModel.findByIdAndUpdate(
          { _id: idStudent },
          { $push: { responsables: createdResponsable } },
          { new: true },
        );
      })
      .catch(err => {
        return err;
      });
  }
  async getResponsables(idStudent: string) {
    return this.studentModel
      .findOne({ _id: idStudent }, { responsables: 1 })
      .then((student: Student) => {
        console.log('Get all responsables for student with id: ', idStudent);

        return this.responsableModel.find({
          _id: { $in: student.responsables },
        });
      })
      .catch(err => {
        console.log("Can't get studend's responsables ", idStudent, '\n', err);
        return err;
      });
  }
  async getResponsable(idStudent: string, idResponsable: string) {
    return this.studentModel
      .findOne({ _id: idStudent }, { responsables: 1 })
      .then((student: Student) => {
        console.log('Get responsable with id: ', idResponsable);

        return this.responsableModel.findOne({
          _id: idResponsable,
        });
      })
      .catch(err => {
        console.log("Can't get studend's responsables ", idStudent, '\n', err);
        return err;
      });
  }
  async updateResponsable(idResponsable: string, updateResponsableDto: UpdateResponsableDto) {
    return this.responsableModel.findByIdAndUpdate({ _id: idResponsable }, updateResponsableDto, {
      new: true,
      returnDocument: 'after',
      lean: true,
    });
  }
}
