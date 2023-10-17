import { Model } from 'mongoose';
import { ClasseDTO } from '../dto/classe.dto';
import { Classe } from '../schemas/classe.schema';
import { InjectModel } from '@nestjs/mongoose';

export class ClasseService {
  constructor(@InjectModel('Classe') private classeModel: Model<Classe>) {}
  addClasse(createClasse: ClasseDTO) {
    throw new Error('Method not implemented.');
  }
  allClasse() {
    throw new Error('Method not implemented.');
  }
  findOneClasse(id: string) {
    throw new Error('Method not implemented.');
  }
  updateClasse(arg0: { id: string }, updatedClasse: any) {
    throw new Error('Method not implemented.');
  }
  deleteClasse(arg0: { id: string }) {
    throw new Error('Method not implemented.');
  }
  softdeleteClasse(arg0: { id: string }) {
    throw new Error('Method not implemented.');
  }
}
