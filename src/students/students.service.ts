import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, NativeError } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
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
  async add(createStudentDto: CreateStudentDto): Promise<Student | any> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save(function (err, student) {
      if (err) {
        return err;
      }
      console.log('Newly created student', student);
      return student;
    });
  }

  async findAll(): Promise<Student[] | any> {
    return this.studentModel
      .find()
      .then(function (students: Student[]) {
        console.log('We found students', students);
        return students;
      })
      .catch(function (err: any) {
        console.log('Une erreur est survenue', err);
        return err;
      });
  }

  async findOne(id: string): Promise<Student | any> {
    return this.studentModel
      .findOne({ _id: id }, { name: 1, email: 1, telephone: 1, matricule: 1 })
      .then((student: Student) => {
        console.log('Find one student with id = ', student.id);
        return student;
      })
      .catch((err) => {
        console.log("Can't find student with id = ", id, '\n', err);
        return err;
      });
    // return `This action returns a #${id} student`;
  }

  updateOne(id: string, updateStudentDto: UpdateStudentDto) {
    // return this.studentModel.updateOne({ _id: id }, updateStudentDto);
    return this.studentModel
      .findByIdAndUpdate({ _id: id }, updateStudentDto, {
        new: true,
        returnDocument: 'after',
        lean: true,
      })
      .then((student: Student) => {
        console.log('The student has been updated: ', student);
        return student;
      })
      .catch((err) => {
        console.error(err.message);
        return err;
      });
  }

  remove(id: string) {
    this.studentModel.findByIdAndRemove(
      { _id: id },
      function (err: NativeError, student: Student) {
        if (err) {
          console.error(err.message);
          return { error: err.message };
        }
        console.log('The student has been deleted:', student);
        return true;
      },
    );
  }
}
