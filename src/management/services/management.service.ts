import { Model } from 'mongoose';
import { Employee } from '../schemas/employee.schema';
import { Injectable } from '@nestjs/common';
import { DocumentOrganisation } from '../schemas/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentOrganisationDTO } from '../dto/document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { Organization } from '../schemas/organization.schema';
import OrganizationDto from '../dto/org.dto';
@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(DocumentOrganisation.name) private DocumentOrganisationModel: Model<DocumentOrganisation>,
    @InjectModel('Organization') private orgModel: Model<Organization>,
  ) {}

  async addDocumentSpec(docDto: DocumentOrganisationDTO): Promise<DocumentOrganisation | string | Error> {
    const createddoc = new this.DocumentOrganisationModel(docDto);
    console.log({ createddoc });

    try {
      const resu = await createddoc.save();
      console.log({ resu });

      return resu;
    } catch (error) {
      // console.log({ keyValue: error.keyValue });
      // console.log({ keys: Object.keys(error) });
      if (error.name === 'MongoServerError' && error.code == 11000) {
        console.log('MongoServer error');
        error['message'] = `There is duplicate key in fields ${Object.keys(error.keyValue)}`;
      }
      return Error(error);
    }
  }

  async findAllDocuments(): Promise<DocumentOrganisation[] | []> {
    return this.DocumentOrganisationModel.find({ deletedAt: null }).exec();
  }
  async deleteDocument(code: string): Promise<boolean | object> {
    try {
      const doc = await this.DocumentOrganisationModel.findOne({ code }).exec();
      doc.deletedAt = new Date();
      await doc.save();
      return doc['deletedAt'] != null;
    } catch (error) {
      return error;
    }
  }
  async remove(code: string): Promise<DocumentOrganisation | void> {
    return this.DocumentOrganisationModel.findOneAndRemove({ code });
  }
  async updateDocument(code: string, documentUpdate: UpdateDocumentDto): Promise<DocumentOrganisation | null> {
    return this.DocumentOrganisationModel.findOneAndUpdate({ code }, { $set: { ...documentUpdate } }).exec();
  }
  async addFiliere(filiereDto: OrganizationDto): Promise<Organization | void> {
    const createdfiliere = new this.orgModel(filiereDto);
    return createdfiliere.save();
  }
  async softDeleteFiliere(code: string): Promise<Organization | void> {
    return this.orgModel.findByIdAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } });
  }
  async removeFiliere(code: string): Promise<Organization | void> {
    return this.orgModel.findOneAndRemove({ code });
  }
  async updateFiliere(code: string, orgUpdate: OrganizationDto): Promise<Organization | null | string> {
    const filiere = await this.orgModel.findOne({ code });
    // if (filiere) {
    //   if (orgUpdate.manager != orgUpdate.sub_manager) {
    //     return this.orgModel.findOneAndUpdate({ code }, { $set: { ...orgUpdate } }).exec();
    //     // filiere.save();
    //   } else {
    //     return 'Le manager et le sub_manager semble correspondre a la meme personne';
    //   }
    // }

    return;
  }
  async findAllFiliere(): Promise<Organization[] | void> {
    //return all filiere that is not marked as deletedAt
    return this.orgModel.find({ deletedAt: null });
  }
}
