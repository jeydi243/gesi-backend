import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel('Employee') private employeeModel: Model<Employee>) {}

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
  async updateEmployee(code: string, employeeUpdate: UpdateEmployeeDto): Promise<Employee | null | string> {
    const employee = await this.employeeModel.findOne({ code });
    if (employee) {
      return this.employeeModel.findOneAndUpdate({ code }, { $set: { ...employeeUpdate } }).exec();
      // filiere.save();
    }

    return "Impossible de modifier cette employé, il n'existe pas";
  }
  async findAllEmployee(): Promise<Employee[] | void> {
    //return all Employee that is not marked as deletedAt
    return this.employeeModel.find({ deletedAt: null });
  }
}
