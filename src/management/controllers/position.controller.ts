import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ManagementService } from '../services/management.service';
import { PositionDTO } from '../dto/position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Controller('positions')
export class PositionController {
  constructor(private readonly managementService: ManagementService) {}

  @Get('')
  findPosition() {
    return this.managementService.findAllPosition();
  }
  @Post('')
  addPosition(@Body() body: PositionDTO) {
    return this.managementService.addPosition(body);
  }
  @Delete('positions/:code')
  removePosition(@Query('code') code: string) {
    return this.managementService.removePosition(code);
  }
  @Patch('positions/update/:code')
  updatePosition(@Query('code') code: string, @Body() body: UpdatePositionDto) {
    // return this.managementService.updatePosition(code, body);
  }
}
