import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { CreateResponsableDTO } from './dto/create-responsable.dto';
import { UpdateResponsableDTO } from './dto/update-responsable.dto';
import { Student } from './schemas/student.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { moveSync } from 'fs-extra';
import * as tempDirectory from 'temp-dir';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDTO: CreateStudentDTO) {
    try {
      const student: Student | void = await this.studentsService.add(createStudentDTO);
      return { student };
    } catch (err) {
      return err.message;
    }
  }

  @Post('/:studentID/profile_image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('profile_image'))
  async setProfileImage(@UploadedFiles() profile_image: Express.Multer.File | Array<Express.Multer.File>, @Param('studentID') studentID: string) {
    try {
      console.log('Change profile image for student %s', studentID);
      console.log({ profile_image });

      const response: boolean | string = await this.studentsService.updateProfileImage(studentID, profile_image[0].id);
      return response === true ? response : 'Profile image not modified';
    } catch (error) {
      console.log(error);
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
  update(@Param('id') id: string, @Body() updateStudentDTO: UpdateStudentDTO) {
    return this.studentsService.updateOne(id, updateStudentDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  //section des responsables
  @Post('/:id/responsables')
  async addResponsable(@Param('id') idStudent: string, @Body() respoDTO: CreateResponsableDTO) {
    return this.studentsService
      .addResponsable(idStudent, respoDTO)
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
  async updateResponsable(@Param('id') idStudent: string, @Param('idResponsable') idResponsable: string, @Body() updateResponsableDTO: UpdateResponsableDTO) {
    return this.studentsService.updateResponsable(idResponsable, updateResponsableDTO);
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
  async updateDocument(@Param('id') idStudent: string, @Param('code') codeDocument: string, @UploadedFile() file: Express.Multer.File) {
    const destinationPath = this.buildLink(idStudent, file, codeDocument);
    console.log(tempDirectory, file.path);

    moveSync(file.path, destinationPath, { overwrite: true }); //move file to specific student storage

    console.log(`The file successful move to ${destinationPath}`);
    try {
      const res: number | any = await this.studentsService.updateDocument2(idStudent, codeDocument, destinationPath);
      if (Number.isInteger(res) && res > 0) {
        return `Student ${idStudent} successfully change ${res} document: ${codeDocument} `;
      }
      throw new BadRequestException(res);
    } catch (er) {
      return er;
    }
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
  async addDocument(@Param('id') idStudent: string, @Body('code') codeDocument: string, @UploadedFile() file: Express.Multer.File) {
    return this.studentsService.addDocument(idStudent, codeDocument, file);
  }

  buildLink(studentID: string, doc: Express.Multer.File, code: string): string {
    const ext = doc.mimetype.split('/')[1];
    return `../STORAGE/Students/${studentID}/Documents/${code}.${ext}`;
  }
}
