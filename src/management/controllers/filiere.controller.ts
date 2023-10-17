import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { FiliereDTO } from '../dto/create-filiere.dto';
import { UpdateFiliereDto } from '../dto/update-filiere.dto';
import { ManagementService } from '../services/management.service';
@Controller('filiere')
export class FiliereController {
  constructor(private readonly managementService: ManagementService) {}

  @Get('filieres')
  findFiliere() {
    return this.managementService.findAllFiliere();
  }
  @Post('filieres')
  addFiliere(@Body() body: FiliereDTO) {
    return this.managementService.addFiliere(body);
  }
  @Delete('filieres/:code')
  removeFiliere(@Query('code') code: string) {
    return this.managementService.removeFiliere(code);
  }
  @Patch('filieres/update/:code')
  updateFiliere(@Query('code') code: string, @Body() body: UpdateFiliereDto) {
    return this.managementService.updateFiliere(code, body);
  }
}
