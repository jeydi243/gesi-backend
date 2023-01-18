import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
  @UseInterceptors(FilesInterceptor('course_image'))
  async setDefaultCourseImage(@UploadedFiles() course_image: Express.Multer.File | Array<Express.Multer.File>, @Param('courseID') courseID: string) {
    try {
      console.log('Change default image for course id %s', courseID);
      console.log({ course_image });

      const response: boolean | string = await this.coursesService.updateDefaultCourseImage(courseID, course_image[0].id);
      return response === true ? response : 'Profile image not modified';
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('file'))
  changeCourseImage(@UploadedFiles() files) {
    return this.coursesService.setDefaultCourseImage(files);
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
