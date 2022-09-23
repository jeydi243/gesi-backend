import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentOrgDTO } from './dto/document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ManagementService } from './services/management.service';
import { DocumentOrg } from './schemas/document.schema';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

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
  addDocument(@Body() createDoc: any) {
    return this.managementService.addDocumentSpec(createDoc);
  }

  @Patch('documents/update/:code')
  async updateDocument(@Param('code') code: string, @Body() body: any) {
    console.log('Try to update this document: ', code, body);

    try {
      const response: DocumentOrg | null = await this.managementService.updateDocument(code, body);
      console.log({ response });

      if (response != null) {
        return response;
      }
      throw new BadRequestException("Document not found, can't update");
    } catch (error) {
      throw error;
    }
  }

  @Delete('documents')
  deleteDocument(@Body('code') code: string) {
    try {
      const result: boolean | any = this.managementService.deleteDocument(code);
      if (result == true) {
        return true;
      } else {
        throw new NotFoundException(`Can't delete document with code ${code}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
