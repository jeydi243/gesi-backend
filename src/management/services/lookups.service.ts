import { Injectable } from '@nestjs/common';
import ClasseDTO from '../dto/classe.dto';
import { Lookups } from '../schemas/lookups.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import LookupsDTO from '../dto/lookups.dto';
import { Classe } from '../schemas/classe.schema';

@Injectable()
export class LookupsService {
  constructor(@InjectModel('Lookups') private lookupsModel: Model<Lookups>, @InjectModel('Classe') private classeModel: Model<Classe>) {}

  async addClasse(classeDTO: ClasseDTO): Promise<ClasseDTO | null> {
    const createdclasse = new this.classeModel(classeDTO);
    return createdclasse.save();
  }
  async addLookups(lookupsDTO: LookupsDTO): Promise<Lookups | Record<string, any>> {
    try {
      const createdlookups = new this.lookupsModel(lookupsDTO);
      const result = await createdlookups.save();
      return result;
    } catch (error: any) {
      return this.constructValidationError(error, 'lookups');
    }
  }
  async getAllClasses(): Promise<Classe[] | []> {
    //return all documents that is not marked as deletedAt
    return this.classeModel.find({ deletedAt: null }).exec();
  }
  async findAllLookups(): Promise<Lookups[] | []> {
    return this.lookupsModel.find({ deletedAt: null }).exec();
  }
  constructValidationError(error: any, schema: string): Record<string, any> {
    // eslint-disable-next-line prefer-const
    let obj: Record<string, any> = {};
    console.log({ errors: error.errors });
    const meanings = {
      unique: 'Cet valeur existe deja.',
      require: 'Ce champ est obligatoire',
    };
    console.log(`Instance of Error ValidationError is ${error instanceof Error.ValidationError} `);

    if (error instanceof Error.ValidationError) {
      const firstKeyName = Object.keys(error.errors)[0];
      console.log(`first key name found is ${firstKeyName}`);
      console.log(`And contain: ${error.errors[firstKeyName]}`);

      obj.schema = schema;
      obj.field = firstKeyName;
      obj.validationerror = true;
      obj.value = error.errors[firstKeyName]['value'];
      obj.message = meanings[error.errors[firstKeyName]['properties']['type']];
    }
    console.log('The final Object is %o', obj);

    return obj;
  }
}
