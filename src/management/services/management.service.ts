import { Model, Error } from 'mongoose';
import { Filiere } from '../schemas/filiere.schema';
import { Lookups } from '../schemas/lookups.schema';
import { Classe } from '../schemas/classe.schema';
import { Injectable } from '@nestjs/common';
import { FiliereDTO } from '../dto/create-filiere.dto';
import { DocumentOrganisation } from '../schemas/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentOrganisationDTO } from '../dto/document.dto';
import { UpdateFiliereDTO } from '../dto/update-filiere.dto';
import { UpdateDocumentDTO } from '../dto/update-document.dto';
import ClasseDTO from '../dto/classe.dto';
import LookupsDTO from '../dto/lookups.dto';
@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(DocumentOrganisation.name) private DocumentOrganisationModel: Model<DocumentOrganisation>,
    @InjectModel('Filiere') private filiereModel: Model<Filiere>,
    @InjectModel('Lookups') private lookupsModel: Model<Lookups>,
    @InjectModel('Classe') private classeModel: Model<Classe>,
  ) {}

  async addDocumentSpec(docDTO: DocumentOrganisationDTO): Promise<DocumentOrganisation | string | Error> {
    const createddoc = new this.DocumentOrganisationModel(docDTO);
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
      return new Error(error);
    }
  }
  async findAllDocuments(): Promise<DocumentOrganisation[] | []> {
    //return all documents that is not marked as deletedAt
    return this.DocumentOrganisationModel.find({ deletedAt: null }).exec();
  }
  async getAllClasses(): Promise<Classe[] | []> {
    //return all documents that is not marked as deletedAt
    return this.classeModel.find({ deletedAt: null }).exec();
  }
  async findAllLookups(): Promise<Lookups[] | []> {
    return this.lookupsModel.find({ deletedAt: null }).exec();
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
  async deleteLookups(code: string): Promise<boolean | object> {
    try {
      const doc = await this.lookupsModel.findOne({ code }).exec();
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
  async updateDocument(code: string, documentUpdate: UpdateDocumentDTO): Promise<DocumentOrganisation | null> {
    return this.DocumentOrganisationModel.findOneAndUpdate({ code }, { $set: { ...documentUpdate } }).exec();
  }
  async addFiliere(filiereDTO: FiliereDTO): Promise<Filiere | void> {
    const createdfiliere = new this.filiereModel(filiereDTO);
    return createdfiliere.save();
  }
  async addClasse(classeDTO: ClasseDTO): Promise<ClasseDTO | null> {
    const createdclasse = new this.classeModel(classeDTO);
    return createdclasse.save();
  }
  async addLookups(lookupsDTO: LookupsDTO): Promise<Lookups | Record<string, any>> {
    try {
      const createdlookups = new this.lookupsModel(lookupsDTO);
      const result = await createdlookups.save();
      return result;
    } catch (leka: any) {
      return this.constructValidationError(leka, 'lookups');
    }
  }
  constructValidationError(error: any, schema: string): Record<string, any> {
    // eslint-disable-next-line prefer-const
    let obj: Record<string, any> = {};
    console.log(error);

    console.log(`Instance of Error ValidationError is ${error instanceof Error.ValidationError} `);

    if (error instanceof Error.ValidationError) {
      const firstKeyName = Object.keys(error.errors)[0];
      console.log(`first key name found is ${firstKeyName}`);
      console.log(`And contain: ${error.errors[firstKeyName]}`);

      obj.schema = schema;
      obj.validationerror = true;
      obj.field = firstKeyName;
      obj.value = error.errors[firstKeyName]['value'];
      obj.message = error.errors[firstKeyName]['properties']['type'];
    }
    console.log('The final Object is %o', obj);

    return obj;
  }
  async softDeleteFiliere(code: string): Promise<Filiere | void> {
    return this.filiereModel.findByIdAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } });
  }
  async removeFiliere(code: string): Promise<Filiere | void> {
    return this.filiereModel.findOneAndRemove({ code });
  }
  async updateFiliere(code: string, filiereUpdate: UpdateFiliereDTO): Promise<Filiere | null | string> {
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
