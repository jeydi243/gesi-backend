import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentOrgDTO } from './dto/create-document.dto';
import { FiliereDTO } from './dto/create-filiere.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';
import { ManagementService } from './management.service';

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
  updateDocument(@Query('code') code: string, @Body() body: UpdateDocumentDto) {
    return this.managementService.updateDocument(code, body);
  }

  @Delete('documents/:code')
  @HttpCode(200)
  removeDocument(@Query('code') code: string) {
    return this.managementService.remove(code);
  }

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
}
