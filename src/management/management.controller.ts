import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { DocumentOrgDTO } from './dto/create-document.dto';
import { EmployeeDto } from './dto/create-employee.dto';
import { FiliereDTO } from './dto/create-filiere.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';
import { ManagementService } from './management.service';
import { DocumentOrg } from './schemas/document.schema';
import { ApiOperation } from '@nestjs/swagger';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}
  @Get()
  findAll() {
    // return this.managementService.findAll();
  }
  @Post()
  add(@Body() createDoc: DocumentOrgDTO) {
    return this.managementService.addDocumentSpec(createDoc);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    // return this.managementService.addDocumentSpec(createDoc);
    return `File ${file.filename} uploaded successfully  ${file.mimetype}`;
  }
  @Post('fruits')
  @HttpCode(200)
  uploadFruits(@Body() body) {
    return `Body sent  is ${body}`;
  }

  @Get('documents')
  @HttpCode(200)
  findAllDocuments() {
    return this.managementService.findAllDocuments();
  }
  @Post('documents')
  @HttpCode(200)
  addDocument(@Body() body: DocumentOrgDTO) {
    return this.managementService.addDocumentSpec(body);
  }

  @Patch('documents/:code')
  @HttpCode(200)
  softDeleteDocument(@Query('code') code: string) {
    return this.managementService.softDelete(code);
  }

  @Patch('documents/update/:code')
  @HttpCode(200)
  async updateDocument(@Query('code') code: string, @Body() body: UpdateDocumentDto) {
    console.log('Try to update tgis docment: ', body);

    try {
      const response: DocumentOrg | null = await this.managementService.updateDocument(code, body);
      console.log({ response });

      if (response != null) {
        return response;
      }
      new BadRequestException('Document not found');
    } catch (error) {
      return error;
    }
  }

  @Delete('documents/:code')
  @HttpCode(200)
  removeDocument(@Query('code') code: string) {
    return this.managementService.remove(code);
  }

  //cette section s'occupe des routes 'Filieres'
  @Get('filieres')
  @HttpCode(200)
  findFiliere() {
    return this.managementService.findAllFiliere();
  }
  @Post('filieres')
  @HttpCode(200)
  addFiliere(@Body() body: FiliereDTO) {
    return this.managementService.addFiliere(body);
  }
  @Delete('filieres/:code')
  @HttpCode(200)
  removeFiliere(@Query('code') code: string) {
    return this.managementService.removeFiliere(code);
  }
  @Patch('filieres/update/:code')
  @HttpCode(200)
  updateFiliere(@Query('code') code: string, @Body() body: UpdateFiliereDto) {
    return this.managementService.updateFiliere(code, body);
  }

  //Cette section s'occupe des route employee
  @Get('employees')
  @HttpCode(200)
  findAllEmployee() {
    return this.managementService.findAllEmployee();
  }
  @Post('employees')
  @HttpCode(200)
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
    
    return this.managementService.addEmployee(body);
  }
}
