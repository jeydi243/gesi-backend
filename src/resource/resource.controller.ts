import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { ResourceService } from './resource.service';
import { PartialResourceDTO, ResourceDTO } from './resource.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('img'))
  uploadV2(@UploadedFiles() img: Express.Multer.File | Array<Express.Multer.File>) {
    console.log("C'est sa qui m'enerve");

    let reponse;
    try {
      if (Array.isArray(img)) {
        const file = img[0];
        reponse = {
          version: 'v2',
          originalname: file.originalname,
          mimetype: file.mimetype,
          id: file.id,
          filename: file.filename,
          metadata: file.metadata,
          bucketName: file.bucketName,
          chunkSize: file.chunkSize,
          size: file.size,
          md5: file.md5,
          uploadDate: file.uploadDate,
          contentType: file.contentType,
        };
      } else {
        const file = img;
        reponse = {
          version: 'v2',
          originalname: file.originalname,
          mimetype: file.mimetype,
          id: file.id,
          filename: file.filename,
          metadata: file.metadata,
          bucketName: file.bucketName,
          chunkSize: file.chunkSize,
          size: file.size,
          md5: file.md5,
          uploadDate: file.uploadDate,
          contentType: file.contentType,
        };
      }
      console.log({ reponse });
      return reponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  async getAllResources() {
    try {
      const files: PartialResourceDTO[] = await this.resourceService.find();

      return files;
    } catch (error) {
      console.log({ error });
    }
  }

  @Get('info/:id')
  async getResourceInfo(@Param('id') id: string): Promise<ResourceDTO | any> {
    console.log('Want to get resource info');
    //63bae5a465e3f03815bc43d1
    try {
      const file = await this.resourceService.findResourceInfo(id);
      return {
        message: 'File has been detected',
        file: file,
      };
    } catch (error) {
      console.log({ error });
    }
  }

  @Get('file/:id')
  async getResourceFile(@Param('id') id: string, @Res() res) {
    console.log('Want to get resource file');
    const file = await this.resourceService.findResourceInfo(id);
    const filestream = await this.resourceService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('download/:id')
  async downloadResource(@Param('id') id: string, @Res() res) {
    const file = await this.resourceService.findResourceInfo(id);
    const filestream = await this.resourceService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Delete(':id')
  async deleteResourceByID(@Param('id') id: string): Promise<ResourceDTO | any> {
    console.log('Delete resource with id %s', id);
    try {
      const filestream = await this.resourceService.deleteResource(id);
      if (filestream) {
        throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED);
      }
      return {
        message: `Resource with id ${id} has been deleted`,
      };
    } catch (error) {
      console.log({ error });
    }
  }
}
