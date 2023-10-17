import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClasseDTO } from '../dto/classe.dto';
import { ClasseService } from '../services/classe.service';
import { LookupsDTO } from '../dto/lookups.dto';

@Controller('classes')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}
  @Post('')
  async addClasse(@Body() createClasse: ClasseDTO) {
    try {
      const result = this.classeService.addClasse(createClasse);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('')
  async findAllClasses() {
    try {
      const result = this.classeService.allClasse();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOneClasse(@Param('id') id: string) {
    try {
      const result = this.classeService.findOneClasse(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() updatedClasse) {
    try {
      return await this.classeService.updateClasse({ id }, updatedClasse);
    } catch (error) {}
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.classeService.deleteClasse(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('softdelete/:id')
  async softdeleteOne(@Param('id') id: string) {
    try {
      return await this.classeService.softdeleteClasse(id);
    } catch (error) {}
  }

  @Post('lookups')
  async addLookups(@Body() createLookups: LookupsDTO) {
    try {
      const result = this.classeService.addLookups(createLookups);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('lookups')
  async findAllLookupss() {
    try {
      const result = this.classeService.allLookups();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('lookups/:id')
  async findOneLookups(@Param('id') id: string) {
    try {
      const result = this.classeService.findOneLookups(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Put('lookups/:id')
  async updateOneLookups(@Param('id') id: string, @Body() updatedLookups) {
    try {
      return await this.classeService.updateLookups({ id }, updatedLookups);
    } catch (error) {}
  }

  @Delete('lookups/:id')
  async deleteOneLookups(@Param('id') id: string) {
    try {
      return await this.classeService.deleteLookups(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('lookups/softdelete/:id')
  async softdeleteOneLookups(@Param('id') id: string) {
    try {
      return await this.classeService.softdeleteLookups(id);
    } catch (error) {}
  }
}
