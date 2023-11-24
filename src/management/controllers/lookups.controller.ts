import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClasseDTO } from '../dto/classe.dto';
import { LookupsDTO } from '../dto/lookups.dto';
import { ClasseService } from '../services/classe.service';

@Controller('lookups')
export class LookupsController {
  constructor(private readonly classeService: ClasseService) {}

  @Post('')
  async addLookups(@Body() createLookups: LookupsDTO) {
    try {
      const result = this.classeService.addLookups(createLookups);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('')
  async findAllLookupss() {
    try {
      console.log({ ok: true });
      const result = this.classeService.allLookups();

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  @Get('byClasseID')
  async findByClasseID(@Query('classeID') classeID: string) {
    try {
        console.log(`The classeID Query param is ${classeID}`);
        
      const result = this.classeService.lookupsByClasseID(classeID);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOneLookups(@Param('id') id: string) {
    try {
      const result = this.classeService.findOneLookups(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateOneLookups(@Param('id') id: string, @Body() updatedLookups) {
    try {
      return await this.classeService.updateLookups({ id }, updatedLookups);
    } catch (error) {}
  }

  @Delete(':id')
  async deleteOneLookups(@Param('id') id: string) {
    try {
      return await this.classeService.deleteLookups(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('softdelete/:id')
  async softdeleteOneLookups(@Param('id') id: string) {
    try {
      return await this.classeService.softdeleteLookups(id);
    } catch (error) {}
  }
}
