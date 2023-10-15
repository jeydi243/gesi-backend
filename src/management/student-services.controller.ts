import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './services/student-services.service';
import StudentServiceDTO from './dto/student-service.dto';

@Controller('StudentService')
export class StudentServiceController {
  constructor(private readonly studentService: StudentService) {}
  @Post('')
  async addService(@Body() service: StudentServiceDTO) {
    const result = await this.studentService.addService(service);
    try {
    } catch (error) {}
  }
}
