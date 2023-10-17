import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import OrganizationDto from '../dto/org.dto';
import { OrganizationService } from '../services/organization.service';

@Controller('organizations')
export default class OrgsController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post('')
  async addOrg(@Body() createOrg: OrganizationDto) {
    try {
      const result = this.orgService.addOrg(createOrg);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('')
  async findAllOrgs() {
    try {
      const result = this.orgService.allOrg();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOneOrg(@Param('id') id: string) {
    try {
      const result = this.orgService.findOneOrg(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() updatedOrg) {
    try {
      return await this.orgService.updateOrg({ id }, updatedOrg);
    } catch (error) {}
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.orgService.deleteOrg({ id });
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('softdelete/:id')
  async softdeleteOne(@Param('id') id: string) {
    try {
      return await this.orgService.softdeleteOrg({ id });
    } catch (error) {}
  }
}
