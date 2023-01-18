import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Responsable } from './schemas/responsable.schema';
import { Student } from './schemas/student.schema';
import { moveSync } from 'fs-extra';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Responsable')
    private responsableModel: Model<Responsable>,
  ) {}
  async add(createStudentDto: CreateStudentDto): Promise<Student | void> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  async updateProfileImage(studentID: string, resource_id: string): Promise<boolean | string> {
    try {
      const resp = await this.studentModel.findOneAndUpdate({ id: studentID }, { $set: { profile_image: resource_id } }).exec();
      if (!resp) return `No student with ID ${studentID}`;
      else if (resp['profile_image'] != '63bf2dda6afe67abeb28c994') return resp['profile_image'];
    } catch (error) {
      console.log(error);
      return error['message'];
    }
  }

  async findAll(): Promise<Student[] | any> {
    try {
      const students = await this.studentModel.find({});
      console.log({ students });
      return students;
    } catch (err) {
      console.log('Une erreur est survenue', err);
      return err;
    }
  }

  async findOne(id: string): Promise<Student | any> {
    return this.studentModel
      .findOne({ _id: id }, { name: 1, email: 1, telephone: 1, matricule: 1 })
      .then((student: Student) => {
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
    this.studentModel.findByIdAndRemove({ _id: id }, function (err, student: Student) {
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
        return this.studentModel.findByIdAndUpdate({ _id: idStudent }, { $push: { responsables: createdResponsable } }, { new: true });
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
        console.log("Can't get student's responsables ", idStudent, '\n', err);
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
  async updateDocument(idStudent, code, link): Promise<Student | any> {
    try {
      const foundStudent = await this.studentModel.findOne({ id: idStudent });
      const indexOfOld: number = foundStudent.documents.findIndex(doc => doc.code == code);
      if (indexOfOld == -1) {
        throw new BadRequestException("Ce document n'existe pas pour cette utilisateur");
      }
      foundStudent.documents[indexOfOld].link = link;
      return foundStudent.save();
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async updateDocument2(idStudent, code, link): Promise<number | any> {
    try {
      const foundStudent = await this.studentModel.updateOne(
        {
          id: idStudent,
          documents: { $elemMatch: { code: code } },
        },
        { $set: { 'documents.$.link': link } },
      );
      return foundStudent.modifiedCount;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async addDocument(idStudent: string, code: string, file: Express.Multer.File): Promise<Student | any> {
    try {
      const foundStudent = await this.studentModel.findOne({ id: idStudent });
      if (!foundStudent) {
        return new BadRequestException("Cet utilisateur n'existe pas, Impossible d'ajouter le document");
      }
      const link = this.buildLink(idStudent, file, code);
      moveSync(file.path, link, { overwrite: true }); // move the file to the destination path
      foundStudent.documents.push({ code, link });

      return foundStudent.save();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  buildLink(studentID: string, doc: Express.Multer.File, code: string): string {
    const ext = doc.mimetype.split('/')[1];
    return `../STORAGE/Students/${studentID}/Documents/${code}.${ext}`;
  }
}
