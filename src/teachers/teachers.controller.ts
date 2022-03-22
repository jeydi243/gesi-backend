import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Roles } from 'src/users/decorators/role.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
import { UserRole } from 'src/export.type';

// a decommenter apres
// @UseGuards(JwtAuthGuard, RolesGuard) // * JwtAuthGuard et RolesGuard sont des guards executé a la suite, l'ordre est important
// @Roles(UserRole.ACADEMIQUE, UserRole.ADMINISTRATIF, UserRole.ADMINISTRATEUR, UserRole.PROFESSEUR)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly professorsService: TeachersService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateTeacherDto) {
    return this.professorsService.create(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('Okay ', id);

    return this.professorsService.findById(id);
  }

  @Patch(':id')
  async updateById(@Query('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.professorsService.updateById(id, updateTeacherDto);
  }

  @Patch('where')
  async updateWhere(@Body() body) {
    return this.professorsService.updateWhere(body.where, body.fields);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.professorsService.deleteById(id);
  }
}
