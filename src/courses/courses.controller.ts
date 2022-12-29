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
