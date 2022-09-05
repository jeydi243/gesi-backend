import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnprocessableEntityException,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { log } from 'console';
import { Request } from 'express';
import { Employee } from './schemas/employee.schema';
import { moveSync } from 'fs-extra';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './services/employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import EducationDTO from './dto/education.dto';
import ExperienceDto from './dto/experience.dto';
import buildLink from 'src/utils';
import ContactDto from './dto/contact.dto';
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post("")
  @Header('Cache-Control', 'none')
  @ApiOperation({ summary: 'Register new employee', description: 'Register a new employee' })
  @ApiCreatedResponse({
    description: 'The employee has been successfully created.',
    type: EmployeeDto,
  })
  async addEmployee(@Body() employee: EmployeeDto): Promise<EmployeeDto | null> {
    log(employee);
    try {
      const res: EmployeeDto | null = await this.employeeService.addEmployee(employee);
      log({ res });
      if (res) {
        return res;
      }
      throw new BadRequestException("Can't add employee");
    } catch (er) {
      log(er);
      throw er;
    }
  }

  @Get()
  @Header('Cache-Control', 'none')
  getEmployees() {
    return this.employeeService.getEmployees();
  }
  @Get('/:employeeID')
  async employeeBy(@Param('employeeID') employeeID: string) {
    return this.employeeService.employeeBy(employeeID);
  }

  @Post('/:employeeID')
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
  @ApiResponse({ status: 201, description: 'The education has been successfully added.' })
  @ApiResponse({ status: 200, description: 'The education has been successfully added.' })
  async add_education(@Param('employeeID') employeeID: string, @Body() education: EducationDTO): Promise<EducationDTO | null> {
    log('Add education from employee: ', employeeID, education);

    const res: EducationDTO | null = await this.employeeService.add_education(employeeID, education);
    if (res != null) {
      return res;
    }
  }

  @Post(':employeeID/add_contact')
  @ApiOperation({
    summary: 'Update employee by adding contact',
    description: 'Update an employee by adding contact',
  })
  @ApiResponse({ status: 201, description: 'The contact has been successfully added.' })
  @ApiResponse({ status: 200, description: 'The contact has been successfully added.' })
  async add_contact(@Param('employeeID') employeeID: string, @Body() contact: ContactDto): Promise<ContactDto | null> {
    log('Add contact for employee: ', employeeID, contact);
    try {
      const res: ContactDto | null = await this.employeeService.add_contact(employeeID, contact);
      if (res) {
        return res;
      }
      throw new BadRequestException("Impossible d'ajouter un contact");
    } catch (er) {
      throw er;
    }
  }

  @Post(':employeeID/add_experience')
  @ApiOperation({
    summary: 'Update employee by adding experience',
    description: 'Update an employee by adding experience',
  })
  @ApiResponse({ status: 201, description: 'The experience has been successfully added.' })
  @ApiResponse({ status: 200, description: 'The experience has been successfully added.' })
  async add_experience(@Param('employeeID') employeeID: string, @Body() experience: ExperienceDto): Promise<ExperienceDto | null> {
    log('Add experience to employee: ', employeeID, experience);
    try {
      const res: ExperienceDto | any = await this.employeeService.add_experience(employeeID, experience);
      if (res != null) {
        return res;
      } else {
        throw new BadRequestException("Une erreur est survenue, impossible d'ajouter l'experience");
      }
      return;
    } catch (er) {
      log(er);
      return er;
    }
  }

  @Delete('/:employeeID')
  @ApiOperation({
    summary: 'Delete employee completely',
    description: 'Delete employee completely',
  })
  async delete_employee(@Param('employeeID') employeeID: string) {
    log(employeeID);

    const res: any = await this.employeeService.delete_employee(employeeID);
    return res;
  }

  @Delete(':employeeID/delete_education')
  @ApiOperation({
    summary: 'Update employee by adding education',
    description: 'Update an employee by adding education',
  })
  // @ApiResponse({ status: 201, description: 'The education has been successfully deleted.' })
  // @ApiResponse({ status: 200, description: 'The education has been successfully deleted.' })
  async delete_education(@Param('employeeID') employeeID: string, @Body('educationID') educationID: string) {
    try {
      const res: boolean | any = await this.employeeService.delete_education(employeeID, educationID);
      console.log({ res });

      if (res) {
        return res;
      } else {
        throw new BadRequestException(`Can't delete education which not exist with id ${educationID}`);
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete(':employeeID/delete_contact')
  @ApiOperation({
    summary: 'Update employee by deleting contact',
    description: 'Update an employee by deleting contact',
  })
  @ApiResponse({ status: 201, description: 'The contact has been successfully deleted.' })
  @ApiResponse({ status: 200, description: 'The contact has been successfully deleted.' })
  async delete_contact(@Param('employeeID') employeeID: string, @Body('contactID') contactID: string) {
    try {
      const res: boolean | null = await this.employeeService.delete_contact(employeeID, contactID);
      if (res != null) {
        return res;
      } else {
        return new NotFoundException(`Can't delete contact with id ${contactID}`);
      }
    } catch (error) {
      throw error;
    }
  }

  @Delete(':employeeID/delete_experience')
  @ApiOperation({
    summary: 'Update employee by deleting experience',
    description: 'Update an employee by deleting experience',
  })
  async delete_experience(@Query('employeeID') employeeID: string, @Body('experienceID') experienceID: string) {
    try {
      const res: boolean | null = await this.employeeService.delete_experience(employeeID, experienceID);
      if (res != null) {
        return res;
      } else {
        return new NotFoundException(`Can't delete experience with id ${experienceID}`);
      }
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:employeeID/update_experience')
  @ApiOperation({ summary: 'Update experience for employee', description: 'Update an employee' })
  async updateExperience(@Param('employeeID') employeeID: string, @Body() experience: UpdateExperienceDto) {
    try {
      const res: [] = await this.employeeService.updateExperence(employeeID, experience);
      if (res && Array.isArray(res)) {
        return res;
      } else {
        throw new BadRequestException("Une erreur est survenue, impossible d'ajouter l'experience");
      }
    } catch (er) {
      throw er;
    }
  }

  @Patch('/:employeeID/update_education?:educationID')
  @ApiOperation({ summary: 'Update education for employee', description: 'Update employee by changing education' })
  async updateEducation(@Param('employeeID') employeeID: string, @Body() education: UpdateEducationDto) {
    try {
      const res: [] = await this.employeeService.updateEducation(employeeID, education);
      log({ res });
      if (Array.isArray(res)) {
        return res;
      }
      throw new UnprocessableEntityException("Can't update educations");
    } catch (er) {
      throw er;
    }
  }
  @Patch('/:employeeID/update_biography')
  @ApiOperation({ summary: 'Update biography for employee', description: 'Update employee by changing biography' })
  async updateBiography(@Param('employeeID') employeeID: string, @Body('biography') biography: string) {
    try {
      // console.log({ query: req.query }, { body: req.body }, { params: req.params }, { biography });
      const res: string | null = await this.employeeService.updateBiography(employeeID, biography);
      log({ res });
      if (res != null) return res;
      throw new BadRequestException("Biography can't be updated");
    } catch (er) {
      throw er;
    }
  }

  @Patch('/:employeeID/update_password')
  @ApiOperation({ summary: 'Update password for employee', description: 'Update employee by changing password of connexion' })
  async updatePassword(@Param('employeeID') employeeID: string, @Body('password') password: string) {
    try {
      // console.log({ query: req.query }, { body: req.body }, { params: req.params }, { biography });
      const res: boolean | null = await this.employeeService.updatePassword(employeeID, password);
      log({ res });
      if (res) return res;
      throw new BadRequestException("Can't update user password");
    } catch (er) {
      throw er;
    }
  }
  @Patch('/:employeeID/update_onboarding')
  @ApiOperation({ summary: 'Update onboarding for employee', description: 'Update employee by changing onboarding' })
  async updateOnboarding(@Param('employeeID') employeeID: string, @Body('onboarding') onboarding: string, @Req() req: Request) {
    try {
      console.log({ query: req.query }, { body: req.body }, { params: req.params }, { onboarding });
      const res: Record<string, unknown>[] | null = await this.employeeService.updateOnboarding(employeeID, onboarding);
      log({ res });
      if (res != null) return res;
      throw new BadRequestException("Onboarding can't be updated");
    } catch (er) {
      throw er;
    }
  }

  @Post('/:employeeID/update_document')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update document for employee', description: 'Update employee by changing document' })
  async updateDocument(@Param('employeeID') employeeID: string, @UploadedFile() file: Express.Multer.File) {
    try {
      console.log({ employeeID }, { ...file });
      const link = buildLink(employeeID, file, file.filename);
      // const res = await this.employeeService.updateDocument(employeeID, docname, link);
    } catch (error) {
      console.log(error);
    }
  }
}
