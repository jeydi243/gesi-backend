import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { StudentService } from '../services/student-services.service';
import StudentServiceDTO from '../dto/student-service.dto';


@Controller('services')
export class StudentServiceController {
  constructor(private readonly studentService: StudentService) {}

  @Post('add')
  async addService(@Body() service: StudentServiceDTO) {
    try {
      const result = await this.studentService.addService(service);
      return result;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get('')
  async findAllServices() {
    try {
      const result = await this.studentService.findAllServices();
      return result;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  @Get(':serviceID')
  async findOne(@Param('serviceID') serviceID: string) {
    try {
      const result = await this.studentService.findOne(serviceID);
      return result;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: Partial<StudentServiceDTO>) {
    try {
      const result = this.studentService.update(id, updateCatDto);
      return result;
    } catch (error) {}
  }

  @Delete(':serviceID')
  async softdeleteService(@Param('serviceID') serviceID: string) {
    console.log(`The ID is ${serviceID}`);
    try {
      const result = await this.studentService.softdeleteService(serviceID);
      return result;
    } catch (error) {
      // throw new NotFoundException(error);
    }
  }
}
