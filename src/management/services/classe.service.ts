import { Model } from 'mongoose';
import { ClasseDTO } from '../dto/classe.dto';
import { Classe } from '../schemas/classe.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LookupsDTO } from '../dto/lookups.dto';
import { Lookups } from '../schemas/lookups.schema';

export class ClasseService {
  constructor(@InjectModel('Classe') private classeModel: Model<Classe>, @InjectModel('Classe') private lookupsModel: Model<Lookups>) {}
  addLookups(createLookups: LookupsDTO) {
    throw new Error('Method not implemented.');
  }
  allLookups() {
    throw new Error('Method not implemented.');
  }
  findOneLookups(id: string) {
    throw new Error('Method not implemented.');
  }
  updateLookups(arg0: { id: string }, updatedLookups: any) {
    throw new Error('Method not implemented.');
  }
  deleteLookups(id: string) {
    throw new Error('Method not implemented.');
  }
  softdeleteLookups(id: string) {
    throw new Error('Method not implemented.');
  }

  addClasse(createClasse: ClasseDTO) {
    const result = new this.classeModel(createClasse);
    return result.save();
  }
  allClasse() {
    return this.classeModel.find().exec();
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
    throw new Error('Method not implemented.');
  }
}
