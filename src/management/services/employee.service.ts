import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Name } from 'src/export.type';
import EducationDTO from '../dto/education.dto';
import { EmployeeDto } from '../dto/employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../schemas/employee.schema';
import { log } from 'console';
import uniqid from 'uniqid';

@Injectable()
export class EmployeeService {
  async delete_employee(id: string): Promise<any> {
    return await this.employeeModel.findOneAndRemove({ id }).exec();
  }
  organisationName = '';
  organisationDomain = '';
  constructor(@InjectModel('Employee') private employeeModel: Model<Employee>) {}

  async employeeBy(id: string): Promise<EmployeeDto | any> {
    return this.employeeModel.findOne({ id }).exec();
  }
  async getEmployees(): Promise<Employee[] | null | any> {
    return this.employeeModel
      .find({ deletedAt: null })
      .select(
        '-deletedAt --created -birthday -updatedAt -__v -__t -cover_letter -resume_file -school_end_date -school_start_date -cityzenship',
      );

    // .projection({ deletedAt: 0, cover_letter: 0, resume: 0, school_diploma: 0 })
  }
  createEmail(name: string | Name): string {
    let email = '';
    if (typeof name === 'string') {
      email = name.split(' ').join('.');
    } else {
      email = name.last + '.' + name.middle;
    }
    // const currentyear = new Date().getFullYear();
    email = email + '@' + this.organisationDomain;
    return email;
  }
  //Employee
  async addEmployee(employeeDto: EmployeeDto): Promise<Employee | void> {
    const email = this.createEmail(employeeDto.name);
    employeeDto['email'] = email;
    const createdemployee = new this.employeeModel(employeeDto);
    return createdemployee.save();
  }

  async add_education(employeeID: string, education: EducationDTO): Promise<Employee | void> {
    education.id = uniqid();
    return await this.employeeModel.findByIdAndUpdate(employeeID, { $push: { educations: education } }).exec();
  }
  async delete_education(employeeID: string, educationID: any): Promise<Employee | void> {
    log('donc on y entre');
    return await this.employeeModel
      .findByIdAndUpdate(employeeID, {
        $pull: { educations: { id: educationID } },
      })
      .exec();
  }
  async softDeleteEmployee(code: string): Promise<Employee | void> {
    return this.employeeModel.findByIdAndUpdate({ code }, { $set: { deletedAt: new Date().toISOString() } });
  }
  async removeEmployee(code: string): Promise<Employee | void> {
    return this.employeeModel.findOneAndRemove({ code });
  }
  async updateEmployee(employeeID: string, employeeUpdate: UpdateEmployeeDto): Promise<Employee | null | string> {
    const employee = await this.employeeModel.findOne({ _id: employeeID });
    if (employee) {
      return this.employeeModel.findOneAndUpdate({ employeeID }, { $set: { ...employeeUpdate } }).exec();
      // filiere.save();
    }

    return "Impossible de modifier cette employé, il n'existe pas";
  }
  async findAllEmployee(): Promise<Employee[] | void> {
    //return all Employee that is not marked as deletedAt
    return this.employeeModel.find({ deletedAt: null });
  }
}
