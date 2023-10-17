import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import OrganizationDto from '../dto/org.dto';
import { Organization } from '../schemas/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(@InjectModel('Organization') private orgModel: Model<Organization>) {
    // orgModel.watch().on('change', function (data) {
    //   log('You add new organization must create also password %s', data);
    // });
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

  async allOrg(): Promise<Organization[] | Record<string, any>> {
    return this.orgModel.find({ deletedAt: null });
  }

  async findOneOrg(id: string): Promise<OrganizationDto> {
    return this.orgModel.findOne({ id, deletedAt: null }).exec();
  }

  async deleteOrg(filter: Record<string, any>) {
    return await this.orgModel.findOneAndRemove(filter).exec();
  }

  async softdeleteOrg(filter: Record<string, any>) {
    return await this.orgModel.findOneAndUpdate(filter, { deletedAt: new Date() }).exec();
  }

  async updateOrg(filter, updateValues): Promise<Organization | Record<string, any>> {
    try {
      const result = await this.orgModel.findOneAndUpdate(filter, { $set: { ...updateValues } }).exec();
      return result;
    } catch (er) {
      console.log(er);
      return er;
    }
  }
}
