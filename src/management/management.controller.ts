import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentOrgDTO } from './dto/docmuent.dto';
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
  uploadFruits(@Body() body) {
    return `Body sent  is ${body}`;
  }
}
