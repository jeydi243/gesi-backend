import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentOrganisationDTO } from './dto/document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ManagementService } from './services/management.service';
import { DocumentOrganisation } from './schemas/document.schema';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return `File ${file.filename} uploaded successfully  ${file.mimetype}`;
  }

  @Post('fruits')
  uploadFruits(@Body() body) {
    return `Body sent  is ${body}`;
  }

  @Get('documents')
  async findAllDocuments(): Promise<DocumentOrganisationDTO[] | []> {
    return this.managementService.findAllDocuments();
  }

  @Post('documents')
  async addDocument(@Body() createDoc: DocumentOrganisationDTO) {
    try {
      console.log({ createDoc });

      const res: DocumentOrganisation | string | Error = await this.managementService.addDocumentSpec(createDoc);
      console.log({ res });
      console.log('Type of res is ', typeof res);
      console.log('Instanceof of res is Error', res instanceof Error);
      console.log('Keys of res ', Object.keys(res));
      console.log('Key _doc of res ', res['_doc']);
      console.log('res hasOwnProperty _doc == ', res.hasOwnProperty('_doc'));

      if (!(res instanceof Error)) return res;
      else throw new BadRequestException(res, res['messagge']);
    } catch (error) {
      throw error;
    }
  }

  @Patch('documents/update/:code')
  async updateDocument(@Param('code') code: string, @Body() body: UpdateDocumentDto) {
    console.log('Try to update this document: ', code, body);

    try {
      const response: DocumentOrganisation | null = await this.managementService.updateDocument(code, body);
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
  async deleteDocument(@Body('code') code: string) {
    try {
      const res: boolean | any = await this.managementService.deleteDocument(code);
      console.log({ res });

      if (res === true) {
        return true;
      } else {
        throw new NotFoundException(`Can't delete document with code ${code}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
