import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentOrgDTO } from './dto/create-document.dto';
import { FiliereDTO } from './dto/create-filiere.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';
import { ManagementService } from './management.service';
@Controller('filiere')
export class FiliereController {
  constructor(private readonly managementService: ManagementService) {}

  @Get('filieres')
  @HttpCode(200)
  findFiliere() {
    return this.managementService.findAllFiliere();
  }
  @Post('filieres')
  @HttpCode(200)
  addFiliere(@Body() body: FiliereDTO) {
    return this.managementService.addFiliere(body);
  }
  @Delete('filieres/:code')
  @HttpCode(200)
  removeFiliere(@Query('code') code: string) {
    return this.managementService.removeFiliere(code);
  }
  @Patch('filieres/update/:code')
  @HttpCode(200)
  updateFiliere(@Query('code') code: string, @Body() body: UpdateFiliereDto) {
    return this.managementService.updateFiliere(code, body);
  }
}
