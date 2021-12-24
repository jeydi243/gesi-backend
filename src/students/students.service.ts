import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
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

  async findOne(id: number): Promise<Student | any> {
    return this.studentModel
      .findOne({ _id: id }, { name: 1, email: 1, telephone: 1, matricule: 1 })
      .then((result: Student) => {
        console.log('Find one student with id = ', result.id);
      })
      .catch((err) => {
        console.log("Can't find student with id = ", id, '\n', err);
      });
    // return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    console.log('Field of student that are update', updateStudentDto);
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
