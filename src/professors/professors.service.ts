import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professor, ProfessorDocument } from './schemas/professor.schema';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectModel(Professor.name) private professorModel: Model<ProfessorDocument>,
  ) {}
  create(createProfessorDto: CreateProfessorDto) {
    return 'This action adds a new professor';
  }

  findAll() {
    return `This action returns all professors`;
  }

  findOne(id: string) {
    return `This action returns a #${id} professor`;
  }

  update(id: number, updateProfessorDto: UpdateProfessorDto) {
    return `This action updates a #${id} professor`;
  }

  remove(id: number) {
    return `This action removes a #${id} professor`;
  }
}
