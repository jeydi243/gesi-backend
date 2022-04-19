import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { Student } from './schemas/student.schema';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { moveSync } from 'fs-extra';
import * as tempDirectory from 'temp-dir';
import { DocumentOrganisation } from 'src/export.type';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      const student: Student | void = await this.studentsService.add(createStudentDto);
      return { student };
    } catch (err) {
      return err.message;
    }
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
  async addResponsable(@Param('id') idStudent: string, @Body() respoDto: CreateResponsableDto) {
    return this.studentsService
      .addResponsable(idStudent, respoDto)
      .then(result => {
        console.log(`add responsable to student with id ${idStudent}, result: `, result);
        return result;
      })
      .catch(err => {
        return err;
      });
  }

  @Get('/:id/responsables')
  async getResponsables(@Param('id') idStudent: string) {
    return this.studentsService.getResponsables(idStudent);
  }

  @Get('/:idStudent/responsables/:idResponsable')
  async getResponsable(@Param('id') idStudent: string, @Param('idResponsable') idResponsable: string) {
    return this.studentsService.getResponsable(idStudent, idResponsable);
  }
  @Patch('/:id/responsables/:idResponsable')
  async updateResponsable(
    @Param('id') idStudent: string,
    @Param('idResponsable') idResponsable: string,
    @Body() updateResponsableDto: UpdateResponsableDto,
  ) {
    return this.studentsService.updateResponsable(idResponsable, updateResponsableDto);
  }

  @Patch('/:id/documents/:code')
  @UseInterceptors(
    FileInterceptor('document', {
      dest: tempDirectory,
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('pdf')) {
          return callback(new BadRequestException('Le format de document accepté est PDF'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1MB
      },
    }),
  )
  async updateDocument(
    @Param('id') idStudent: string,
    @Param('code') codeDocument: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const destinationPath = this.buildLink(idStudent, file, codeDocument);
    console.log(tempDirectory, file.path);

    moveSync(file.path, destinationPath, { overwrite: true }); //move file to specific student storage

    console.log(`The file successful move to ${destinationPath}`);
    const res: number | any = await this.studentsService.updateDocument2(idStudent, codeDocument, destinationPath);
    if (Number.isInteger(res) && res > 0) {
      return `Student ${idStudent} successfully change ${res} document: ${codeDocument} `;
    }
    return new BadRequestException(res);
  }
  @Post('/:id/documents')
  @UseInterceptors(
    FileInterceptor('document', {
      dest: tempDirectory,
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('pdf')) {
          return callback(new BadRequestException('Le format de document accepté est PDF'), false);
        }
        callback(null, true);
      },
      // limits: {
      //   fileSize: Math.pow(1024, 2), // 1MB
      // },
    }),
  )
  async addDocument(
    @Param('id') idStudent: string,
    @Body('code') codeDocument: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentsService.addDocument(idStudent, codeDocument, file);
  }

  buildLink(studentID: string, doc: Express.Multer.File, code: string): string {
    const ext = doc.mimetype.split('/')[1];
    return `../STORAGE/Students/${studentID}/Documents/${code}.${ext}`;
  }
}
