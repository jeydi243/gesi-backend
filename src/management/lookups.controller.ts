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
  async addLookups(@Body() lookups: LookupsDTO) {
    try {
      console.log({ lookups });

      const res: Lookups | string | Error = await this.managementService.addLookups(lookups);
      console.log({ res });
      console.log('Type of res is ', typeof res);
      console.log('Instanceof of res is Error', res instanceof Error);
      console.log('Keys of res ', Object.keys(res));
      console.log('Key _doc of res ', res['_doc']);
      console.log('res hasOwnProperty _doc == ', res?.hasOwnProperty('_doc'));

      if (!(res instanceof Error)) return res;
      else throw new BadRequestException(res, res['messagge']);
    } catch (error) {
      throw error;
    }
  }

  @Delete('lookups')
  async deleteLookups(@Body('code') code: string) {
    try {
      const res: boolean | any = await this.managementService.deleteLookups(code);
      console.log({ res });

      if (res === true) {
        return true;
      } else {
        throw new NotFoundException(`Can't delete lookups with code ${code}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
