import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.add(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.updateOne(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  //section des responsables
  @Post('/:id/responsables')
  async addResponsable(
    @Param('id') idStudent: string,
    @Body() respoDto: CreateResponsableDto,
  ) {
    return this.studentsService
      .addResponsable(idStudent, respoDto)
      .then((result) => {
        console.log(
          `add responsable to student with id ${idStudent}, result: `,
          result,
        );
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  @Get('/:id/responsables')
  async getResponsables(@Param('id') idStudent: string) {
    return this.studentsService.getResponsables(idStudent);
  }

  @Get('/:idStudent/responsables/:idResponsable')
  async getResponsable(
    @Param('id') idStudent: string,
    @Param('idResponsable') idResponsable: string,
  ) {
    return this.studentsService.getResponsable(idStudent, idResponsable);
  }
  @Patch('/:id/responsables/:idResponsable')
  async updateResponsable(
    @Param('id') idStudent: string,
    @Param('idResponsable') idResponsable: string,
    @Body() updateResponsableDto: UpdateResponsableDto,
  ) {
    return this.studentsService.updateResponsable(
      idResponsable,
      updateResponsableDto,
    );
  }
}
