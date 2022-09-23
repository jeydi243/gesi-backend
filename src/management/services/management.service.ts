import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { FiliereDTO } from '../dto/create-filiere.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentOrgDTO } from '../dto/document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { UpdateFiliereDto } from '../dto/update-filiere.dto';
import { Filiere } from '../schemas/filiere.schema';
import { Employee } from '../schemas/employee.schema';
import { DocumentOrg } from '../schemas/document.schema';
@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(DocumentOrg.name) private documentOrgModel: Model<DocumentOrg>,
    @InjectModel('Filiere') private filiereModel: Model<Filiere>,
    @InjectModel('Employee') private employeeModel: Model<Employee>,
  ) {}

  async addDocumentSpec(docDto: DocumentOrgDTO): Promise<DocumentOrg | void> {
    const createddoc = new this.documentOrgModel(docDto);
    return createddoc.save();
  }

  async findAllDocuments(): Promise<DocumentOrg[] | void> {
    //return all documents that is not marked as deletedAt
    return this.documentOrgModel.find({ deletedAt: null }).exec();
  }
  async deleteDocument(code: string): Promise<boolean | any> {
    try {
      const result = await this.documentOrgModel.findOneAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } }, { multi: true });
      console.log({ result });
      console.log(result['deletedAt'] != null);

      return result['deletedAt'] != null;
    } catch (error) {
      return false;
    }
  }
  async remove(code: string): Promise<DocumentOrg | void> {
    return this.documentOrgModel.findOneAndRemove({ code });
  }
  async updateDocument(code: string, documentUpdate: UpdateDocumentDto): Promise<DocumentOrg | null> {
    return this.documentOrgModel.findOneAndUpdate({ code }, { $set: { ...documentUpdate } }).exec();
  }
  async addFiliere(filiereDto: FiliereDTO): Promise<Filiere | void> {
    const createdfiliere = new this.filiereModel(filiereDto);
    return createdfiliere.save();
  }
  async softDeleteFiliere(code: string): Promise<Filiere | void> {
    return this.filiereModel.findByIdAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } });
  }
  async removeFiliere(code: string): Promise<Filiere | void> {
    return this.filiereModel.findOneAndRemove({ code });
  }
  async updateFiliere(code: string, filiereUpdate: UpdateFiliereDto): Promise<Filiere | null | string> {
    const filiere = await this.filiereModel.findOne({ code });
    if (filiere) {
      if (filiereUpdate.manager != filiereUpdate.sub_manager) {
        return this.filiereModel.findOneAndUpdate({ code }, { $set: { ...filiereUpdate } }).exec();
        // filiere.save();
      } else {
        return 'Le manager et le sub_manager semble correspondre a la meme personne';
      }
    }

    return;
  }
  async findAllFiliere(): Promise<Filiere[] | void> {
    //return all filiere that is not marked as deletedAt
    return this.filiereModel.find({ deletedAt: null });
  }
}
