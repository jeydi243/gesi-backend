import { Body, Controller, HttpCode, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { EmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './services/employee.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { cwd } from 'process';
import { moveSync } from 'fs-extra';
import { isInstance } from 'class-validator';
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Register new employee', description: 'Register a new employee' })
  addEmployee(@Body() employee: EmployeeDto) {
    console.log(employee);
    try {
      const result = this.employeeService.addEmployee(employee);
      return result;
    } catch (error) {
      console.log(error);
      return 'Une erreur est survenue';
    }
  }

  @Post('/:employeeID')
  @HttpCode(200)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'resume_file', maxCount: 1 },
      { name: 'profile_img', maxCount: 1 },
      { name: 'school_diploma_file', maxCount: 1 },
    ]),
  )
  continueAdd(
    @UploadedFiles()
    files: {
      profile_img: Express.Multer.File;
      school_diploma_file: Express.Multer.File;
      resume_file: Express.Multer.File;
    },
    @Param('employeeID') employeeID: string,
  ) {
    for (const key in files) {
      const file = files[key];
      console.log(file[0]);

      const destinationPath: string | null = this.buildLink(employeeID, file[0], key);
      if (destinationPath) {
        moveSync(files.profile_img.path, destinationPath, { overwrite: true });
      } else {
        console.log('Destination path return null');
      }
    }
  }
  buildLink(employeeID: string, file: Express.Multer.File, filename: string): string | null {
    console.log('FILE in function: ', file);
    try {
      const ext = file.mimetype.split('/')[1];
      const path = `${cwd()}/STORAGE/Employees/${employeeID}/files/${filename}.${ext}`;
      return path;
    } catch (e: any) {
      if (isInstance(e, TypeError)) {
        console.log('Le type');
      }
      console.log(e);
      return null;
    }
  }
}
