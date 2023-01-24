import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import OrganizationDto from '../dto/org.dto';
import { Organization } from '../schemas/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(@InjectModel('Employee') private orgModel: Model<Organization>) {
    orgModel.watch().on('change', function (data) {
      console.log('You add new employee must create also password');
    });
  }
  async addOrg(orgDto: OrganizationDto): Promise<OrganizationDto | null> {
    try {
      const createdorg = new this.orgModel(orgDto);
      const result = await createdorg.save();
      // const createdUser = new this.userModel({ idOfRole,username, password,salt });
      log({ result });
      return result.toObject();
    } catch (er) {
      log(er);
      throw er;
    }
  }
}
