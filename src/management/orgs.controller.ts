import { Body, Controller, Post } from '@nestjs/common';
import OrganizationDTO from './dto/organization.dto';
import { OrganizationService } from './services/organization.service';

@Controller('organization')
export default class OrgsController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post('')
  async addOrg(@Body() createOrg: OrganizationDTO) {
    try {
      const result = this.orgService.addOrg(createOrg);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
