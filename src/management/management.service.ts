import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentOrgDTO } from './dto/create-document.dto';
import { FiliereDTO } from './dto/create-filiere.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateFiliereDto } from './dto/update-filiere.dto';
import { DocumentOrg, DocumentOrgDocument } from './schemas/document.schema';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { Filiere, FiliereDocument } from './schemas/filiere.schema';
import { EmployeeDto } from './dto/create-employee.dto';
@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(DocumentOrg.name) private documentOrgModel: Model<DocumentOrgDocument>,
    @InjectModel(Filiere.name) private filiereModel: Model<FiliereDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async addDocumentSpec(docDto: DocumentOrgDTO): Promise<DocumentOrg | void> {
    const createddocumentOrgModel = new this.documentOrgModel(docDto);
    return createddocumentOrgModel.save();
  }

  async findAllDocuments(): Promise<DocumentOrg[] | void> {
    //return all documents that is not marked as deletedAt
    return this.documentOrgModel.find({ deletedAt: null });
  }
  async softDelete(code: string): Promise<DocumentOrg | void> {
    return this.documentOrgModel.findByIdAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } });
  }
  async remove(code: string): Promise<DocumentOrg | void> {
    return this.documentOrgModel.findOneAndRemove({ code });
  }
  async updateDocument(code: string, documentUpdate: UpdateDocumentDto): Promise<DocumentOrg | null> {
    return this.documentOrgModel.findOneAndUpdate({ code }, { $set: { ...documentUpdate } });
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

  //Employee
  async addEmployee(employeeDto: EmployeeDto): Promise<Employee | void> {
    console.log("Est-ce qu'on arrive meme ici");

    const createdemployee = new this.employeeModel(employeeDto);
    return createdemployee.save();
  }
  async softDeleteEmployee(code: string): Promise<Employee | void> {
    return this.employeeModel.findByIdAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } });
  }
  async removeEmployee(code: string): Promise<Employee | void> {
    return this.employeeModel.findOneAndRemove({ code });
  }
  async updateEmployee(code: string, employeeUpdate: UpdateEmployeeDto): Promise<Filiere | null | string> {
    const employee = await this.filiereModel.findOne({ code });
    if (employee) {
      return this.filiereModel.findOneAndUpdate({ code }, { $set: { ...employeeUpdate } }).exec();
      // filiere.save();
    }

    return "Impossible de modifier cette employé, il n'existe pas";
  }
  async findAllEmployee(): Promise<Employee[] | void> {
    //return all Employee that is not marked as deletedAt
    return this.employeeModel.find({ deletedAt: null });
  }
}
