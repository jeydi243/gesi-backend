import { Controller, Get, Post, Res, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, HttpStatus, HttpException, UploadedFile } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Schema as S } from 'mongoose';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ResourceDTO } from 'src/resource-db/resource.dto';
import { ResourceService } from 'src/resource-db/resource.service';
import { mystorage } from 'src/resource-db/storage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('dotenv').config();

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService, private readonly resourceService: ResourceService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file'))
  changeCourseImage(@UploadedFiles() files) {
    return this.coursesService.updateImage(files);
  }

  @Get()
  async findAll() {
    return this.coursesService
      .findAll()
      .then(courses => courses)
      .catch(err => err);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Get('byauthor/:idauthor')
  findByAuthor(@Param('author') author: S.Types.ObjectId) {
    return this.coursesService.findByAuthor(author);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }

  @Post('addimage')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img' /*,{ storage: mystorage }*/))
  upload(@UploadedFile() files) {
    const response = [];
    console.log({ files });
    // console.log(process.env.NODE_ENV,process.env.MONGO_URI_DEV, process.env.MONGO_URI_PROD);

    try {
      if (Array.isArray(files)) {
        files.forEach(file => {
          const fileReponse = {
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
          response.push(fileReponse);
        });
      }
      console.log({ response });
      // return files;
    } catch (error) {
      console.log(error);
    }

    return response;
  }

  @Get('allimages/2')
  async allimages() {
    try {
      const files = await this.resourceService.find();
      return files;
    } catch (error) {
      console.log({ error });
    }
  }

  @Get('info/:id')
  async getFileInfo(@Param('id') id: string): Promise<ResourceDTO | any> {
    const file = await this.resourceService.findInfo(id);
    const filestream = await this.resourceService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED);
    }
    return {
      message: 'File has been detected',
      file: file,
    };
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res) {
    const file = await this.resourceService.findInfo(id);
    const filestream = await this.resourceService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    const file = await this.resourceService.findInfo(id);
    const filestream = await this.resourceService.readStream(id);
    if (!filestream) {
      throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED);
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Get('delete/:id')
  async deleteFile(@Param('id') id: string): Promise<ResourceDTO | any> {
    const file = await this.resourceService.findInfo(id);
    const filestream = await this.resourceService.deleteFile(id);
    if (!filestream) {
      throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED);
    }
    return {
      message: 'File has been deleted',
      file: file,
    };
  }
}
