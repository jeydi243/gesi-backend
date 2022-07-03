import { Body, Controller, Get, HttpCode, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { EmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './services/employee.service';
import {  FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //Cette section s'occupe des route employee
  @Get('employees')
  @HttpCode(200)
  findAllEmployee() {
    return this.employeeService.findAllEmployee();
  }

  @Post('employees')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Register new employee', description: 'Register a new employee' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'resume_file', maxCount: 1 },
      { name: 'profile_img', maxCount: 1 },
      { name: 'school_diploma_file', maxCount: 1 },
    ]),
  )
  addEmployee(
    @Body() body: EmployeeDto,
    @UploadedFiles()
    files: {
      profile_img: Express.Multer.File;
      school_diploma_file: Express.Multer.File;
      resume_file: Express.Multer.File;
    },
  ) {
    console.log({ files });
    console.log({ body });

    return this.employeeService.addEmployee(body);
  }
}
