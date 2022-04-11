import { Controller, Get } from '@nestjs/common';
import { ManagementService } from './management.service';

@Controller('management')
export class ManagementController {
  constructor(private readonly studentsService: ManagementService) {}
  @Get()
  findAll() {
    // return this.studentsService.findAll();
  }
}
