import { Body, Controller, Post } from '@nestjs/common';
import OrganizationDto from './dto/org.dto';
import { OrganizationService } from './services/organization.service';

@Controller('organization')
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
}
