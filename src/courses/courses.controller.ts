import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Types } from 'mongoose';
import { ApiConsumes } from '@nestjs/swagger';
import { ResourceService } from 'src/resource/resource.service';
import { FilesInterceptor } from '@nestjs/platform-express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('dotenv').config();

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService, private readonly resourceService: ResourceService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Post('/:courseID/course_image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async addCourseImage(@UploadedFiles() images: Array<Express.Multer.File>, @Param('courseID') courseID: string, @Body('setDefault') setDefault: boolean) {
    try {
      console.log('Change default image for course id %s', courseID);
      console.log({ images });
      const imagesID: string[] = images.map(el => el.id);
      const response: Record<string, any> = await this.coursesService.addCourseImage(courseID, imagesID, setDefault);
      return response;
    } catch (error) {
      console.log(error);
      return { ...error };
    }
  }

  @Patch('/:courseID/set_default')
  async setDefaultCourseImage(@Param('courseID') courseID: string, @Query() query: Record<string, string>) {
    try {
      const tr = await this.coursesService.setDefaultCourseImage(courseID, query.resourceID);
      return tr;
    } catch (error) {
      console.log(error);
      return false;
    }
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
  findByAuthor(@Param('author') author: Types.ObjectId) {
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
}
