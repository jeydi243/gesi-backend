import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './services/employee.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { cwd } from 'process';
import { moveSync } from 'fs-extra';
import { isInstance } from 'class-validator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schemas/employee.schema';
import EducationDTO from './dto/education.dto';
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

  @Get()
  getEmployees() {
    return this.employeeService.getEmployees();
  }
  @Get('/:employeeID')
  async employeeBy(@Param('employeeID') employeeID: string) {
    return this.employeeService.employeeBy(employeeID);
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

  @Patch('/:employeeID')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update employee', description: 'Update an employee' })
  async updateEmployee(@Param('employeeID') employeeID: string, @Body() employee: UpdateEmployeeDto) {
    const res: string | Employee = await this.employeeService.updateEmployee(employeeID, employee);
    if (typeof res !== 'string') {
      return res;
    }
    return "Une erreur est survenue, Impossible de mettre à jour l'employé";
  }
  @Post(':employeeID/add_education')
  @ApiOperation({
    summary: 'Update employee by adding education',
    description: 'Update an employee by adding education',
  })
  async add_education(@Query('employeeID') employeeID: string, @Body() education: EducationDTO) {
    console.log('Add education from employee: %s', employeeID, education);

    const res: any = await this.employeeService.add_education(employeeID, education);
    return res;
  }

  @Delete('/:employeeID')
  @ApiOperation({
    summary: 'Delete employee completely',
    description: 'Delete employee completely',
  })
  async delete_employee(@Param("employeeID") p) {
    console.log(p);

    // const res: any = await this.employeeService.delete_employee(id);
    return true;
  }

  @Delete(':employeeID/delete_education?:educationID')
  @ApiOperation({
    summary: 'Update employee by adding education',
    description: 'Update an employee by adding education',
  })
  async delete_education(@Query('employeeID') employeeID: string, @Param('educationID') id: string) {
    const res: any = await this.employeeService.delete_education(employeeID, id);
  }
}
