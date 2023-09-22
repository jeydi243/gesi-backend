import { ApiResponse } from '@nestjs/swagger';
import ClasseDTO from './dto/classe.dto';
import LookupsDTO from './dto/lookups.dto';
import { Lookups } from './schemas/lookups.schema';
import { ManagementService } from './services/management.service';
import { Body, Controller, Post, Get, BadRequestException, NotFoundException, Delete } from '@nestjs/common';

@Controller('management')
export default class LookupsController {
  constructor(private readonly managementService: ManagementService) {}

  @Post('classes')
  async addClasse(@Body() classesDTO: ClasseDTO): Promise<ClasseDTO> {
    try {
      const result: null | ClasseDTO = await this.managementService.addClasse(classesDTO);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('classes')
  async findAllDocuments(): Promise<ClasseDTO[] | []> {
    return this.managementService.getAllClasses();
  }

  @Get('lookups')
  async findAllLookups(): Promise<LookupsDTO[] | []> {
    return this.managementService.findAllLookups();
  }

  @Post('lookups')
  async addLookups(@Body() lookups: LookupsDTO): Promise<LookupsDTO> {
    try {
      const res: Lookups | Record<string, any> = await this.managementService.addLookups(lookups);
      if (res instanceof Lookups) return res;
      else throw res;
    } catch (error: any) {
      console.log('On arrive ici au moins: ', error);
      throw new BadRequestException(error);
    }
  }

  @Delete('lookups')
  async deleteLookups(@Body('code') code?: string, @Body('_id') _id?: string) {
    try {
      console.log({ code, _id });

      const res: Record<string, any> = await this.managementService.deleteLookups(_id);
      console.log({ res });

      if (res['state'] == 'Ok') {
        return res;
      } else {
        throw new NotFoundException(`Can't delete lookups with id ${_id}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
