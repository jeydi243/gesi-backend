import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './services/employee.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { moveSync } from 'fs-extra';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schemas/employee.schema';
import EducationDTO from './dto/education.dto';
import ExperienceDto from './dto/experience.dto';
import { log } from 'console';
import buildLink from 'src/utils';
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Header('Cache-Control', 'max-age=60')
  @HttpCode(200)
  @ApiOperation({ summary: 'Register new employee', description: 'Register a new employee' })
  @ApiCreatedResponse({
    description: 'The employee has been successfully created.',
    type: EmployeeDto,
  })
  async addEmployee(@Body() employee: EmployeeDto): Promise<EmployeeDto | null> {
    log(employee);
    try {
      const result: EmployeeDto | null = await this.employeeService.addEmployee(employee);
      if (result) {
        return result;
      }
      return result;
    } catch (error) {
      log(error);
    }
  }

  @Get()
  @Header('Cache-Control', 'max-age=60')
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
      log(file[0]);

      const destinationPath: string | null = buildLink(employeeID, file[0], key);
      if (destinationPath) {
        moveSync(files.profile_img.path, destinationPath, { overwrite: true });
      } else {
        log('Destination path return null');
      }
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
  @HttpCode(200)
  @ApiResponse({ status: 201, description: 'The education has been successfully added.' })
  @ApiResponse({ status: 200, description: 'The education has been successfully added.' })
  async add_education(
    @Param('employeeID') employeeID: string,
    @Body() education: EducationDTO,
  ): Promise<EducationDTO | null> {
    log('Add education from employee: ', employeeID, education);

    const res: EducationDTO | null = await this.employeeService.add_education(employeeID, education);
    if (res != null) {
      return res;
    }
  }
  @Post(':employeeID/add_experience')
  @ApiOperation({
    summary: 'Update employee by adding experience',
    description: 'Update an employee by adding experience',
  })
  @HttpCode(200)
  @ApiResponse({ status: 201, description: 'The experience has been successfully added.' })
  @ApiResponse({ status: 200, description: 'The experience has been successfully added.' })
  async add_experience(
    @Param('employeeID') employeeID: string,
    @Body() experience: ExperienceDto,
  ): Promise<ExperienceDto | null> {
    log('Add experience to employee: ', employeeID, experience);
    try {
      const res: ExperienceDto | any = await this.employeeService.add_experience(employeeID, experience);
      if (res != null) {
        return res;
      }
      return;
    } catch (error) {
      log();

      return error;
    }
  }

  @Delete('/:employeeID')
  @ApiOperation({
    summary: 'Delete employee completely',
    description: 'Delete employee completely',
  })
  @HttpCode(200)
  async delete_employee(@Param('employeeID') employeeID: string) {
    log(employeeID);

    const res: any = await this.employeeService.delete_employee(employeeID);
    return res;
  }

  @Delete(':employeeID/delete_education?:educationID')
  @ApiOperation({
    summary: 'Update employee by adding education',
    description: 'Update an employee by adding education',
  })
  @HttpCode(200)
  @ApiResponse({ status: 201, description: 'The education has been successfully deleted.' })
  @ApiResponse({ status: 200, description: 'The education has been successfully deleted.' })
  async delete_education(@Query('employeeID') employeeID: string, @Param('educationID') id: string) {
    try {
      const res: any = await this.employeeService.delete_education(employeeID, id);
    } catch (error) {}
  }

  @Delete(':employeeID/delete_experience?:experienceID')
  @ApiOperation({
    summary: 'Update employee by deleting experience',
    description: 'Update an employee by deleting experience',
  })
  @HttpCode(200)
  async delete_experience(@Query('employeeID') employeeID: string, @Param('experienceID') id: string) {
    const res: any = await this.employeeService.delete_experience(employeeID, id);
  }
}
