import { Model } from 'mongoose';
import { Classe } from '../schemas/classe.schema';
import { Lookups } from '../schemas/lookups.schema';
import { ClasseDTO } from '../dto/classe.dto';
import { LookupsDTO } from '../dto/lookups.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Types as S } from 'mongoose';

export class ClasseService {
  lookupsByClasseID(classeID: string) {
    return this.lookupsModel.find({ classe_id: new S.ObjectId(classeID), deletedAt: null }).exec();
  }
  constructor(@InjectModel('Classe') private classeModel: Model<Classe>, @InjectModel('Lookups') private lookupsModel: Model<Lookups>) {}
  addLookups(createLookups: LookupsDTO) {
    const result = new this.lookupsModel(createLookups);
    return result.save();
  }
  allLookups() {
    return this.lookupsModel.find({ deletedAt: null }).exec();
  }
  findOneLookups(id: string) {
    return this.lookupsModel.findOne({ id, deletedAt: null }).exec();
  }
  updateLookups(filter, updatedLookups: any) {
    return this.lookupsModel.findOneAndUpdate(filter, updatedLookups).exec();
  }
  deleteLookups(id: string) {
    return this.lookupsModel.findOneAndRemove({ id }, { deletedAt: new Date() }).exec();
  }
  softdeleteLookups(id: string) {
    return this.lookupsModel.findOneAndUpdate({ id }, { deletedAt: new Date() }).exec();
  }

  addClasse(createClasse: ClasseDTO) {
    const result = new this.classeModel(createClasse);
    return result.save();
  }
  allClasse() {
    return this.classeModel.find({ deletedAt: null }).exec();
  }
  findOneClasse(id: string) {
    return this.classeModel.findOne({ id, deletedAt: null }).exec();
  }
  updateClasse(filter, updatedClasse: any) {
    return this.classeModel.findOneAndUpdate(filter, updatedClasse).exec();
  }
  deleteClasse(id: string) {
    return this.classeModel.findOneAndRemove({ id }, { deletedAt: new Date() }).exec();
  }
  softdeleteClasse(id: string) {
    return this.classeModel.findOneAndUpdate({ id }, { deletedAt: new Date() }).exec();
  }
}
