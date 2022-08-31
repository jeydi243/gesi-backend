import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentOrgDTO } from './dto/document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ManagementService } from './management.service';
import { DocumentOrg } from './schemas/document.schema';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}
  @Get()
  findAll() {
    // return this.managementService.findAll();
    return null;
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
  uploadFruits(@Body() body) {
    return `Body sent  is ${body}`;
  }

  @Get('documents')
  findAllDocuments() {
    return this.managementService.findAllDocuments();
  }
  @Post('documents')
  addDocument(@Body() body: DocumentOrgDTO) {
    return this.managementService.addDocumentSpec(body);
  }

  @Patch('documents/:code')
  softDeleteDocument(@Query('code') code: string) {
    return this.managementService.softDelete(code);
  }

  @Patch('documents/update/:code')
  async updateDocument(@Query('code') code: string, @Body() body: UpdateDocumentDto) {
    console.log('Try to update this document: ', body);

    try {
      const response: DocumentOrg | null = await this.managementService.updateDocument(code, body);
      console.log({ response });

      if (response != null) {
        return response;
      }
      throw new BadRequestException('Document not found');
    } catch (error) {
      return error;
    }
  }

  @Delete('documents/:code')
  removeDocument(@Query('code') code: string) {
    return this.managementService.remove(code);
  }
}
