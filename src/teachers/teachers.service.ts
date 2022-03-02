import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher, ProfessorDocument } from './schemas/teacher.schema';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private professorModel: Model<ProfessorDocument>,
  ) {}
  create(createProfessorDto: CreateTeacherDto) {
    return 'This action adds a new professor';
  }

  findAll() {
    return `This action returns all professors`;
  }

  findOne(id: string) {
    return `This action returns a #${id} professor`;
  }

  update(id: number, updateProfessorDto: UpdateTeacherDto) {
    return `This action updates a #${id} professor`;
  }

  remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
