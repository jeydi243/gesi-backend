import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Roles } from 'src/users/decorators/role.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UserRole } from 'src/export.type';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

// a decommenter apres
// @UseGuards(JwtAuthGuard, RolesGuard) // * JwtAuthGuard et RolesGuard sont des guards executé a la suite, l'ordre est important
// @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR, UserRole.PROFESSEUR)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateTeacherDto) {
    return this.teachersService.create(createProfessorDto);
  }

  @Post('/:teacherID/course_image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('course_image'))
  async setDefaultCourseImage(@UploadedFiles() profile_image: Express.Multer.File | Array<Express.Multer.File>, @Param('teacherID') teacherID: string) {
    try {
      console.log('Change default image for course id %s', teacherID);
      console.log({ profile_image });

      const response: boolean | string = await this.teachersService.updateProfileImage(teacherID, profile_image[0].id);
      return response === true ? response : 'Profile image not modified';
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('Okay ', id);

    return this.teachersService.findById(id);
  }

  @Patch(':id')
  async updateById(@Query('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.updateById(id, updateTeacherDto);
  }

  @Patch('where')
  async updateWhere(@Body() body, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.updateWhere(body.where, updateTeacherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teachersService.deleteById(id);
  }
}
