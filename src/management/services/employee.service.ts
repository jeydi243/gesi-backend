import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Name } from 'src/export.type';
import EducationDTO from '../dto/education.dto';
import { EmployeeDto } from '../dto/employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../schemas/employee.schema';
import { log, error } from 'console';
import * as uniqid from 'uniqid';
import ContactDto from '../dto/contact.dto';
import ExperienceDto from '../dto/experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { UpdateEducationDto } from '../dto/update-education.dto';

@Injectable()
export class EmployeeService {
  async updateDocument(employeeID: string, mapDocument) {
    const resultat = await this.employeeModel.findOneAndUpdate({ id: employeeID }, { $set: { ...mapDocument } }).exec();
    return {};
  }
  organisationName = 'test';
  organisationDomain = 'test.org';
  constructor(@InjectModel('Employee') private employeeModel: Model<Employee>) {}

  async updateEducation(employeeID: string, education: UpdateEducationDto): Promise<[] | null | any> {
    try {
      const resp = await this.employeeModel
        .findOneAndUpdate({ id: employeeID, 'educations.id': education.id }, { $set: { 'educations.$': education } })
        .select('educations -_id')
        .cast()
        .exec();
      return resp['educations'].find(edu => edu['id'] === education.id);
    } catch (er) {
      console.log(er);
      return er;
    }
  }
  async updateExperence(employeeID: string, experience: UpdateExperienceDto): Promise<UpdateExperienceDto[] | null | any> {
    try {
      log('Dans le service %s', experience.id);
      const resp = await this.employeeModel
        .findOneAndUpdate({ id: employeeID, 'experiences.id': experience.id }, { $set: { 'experiences.$': experience } })
        .select('experiences -_id')
        .exec();
      console.log(resp);
      return resp['experiences'].find(exp => exp['id'] === experience.id);
    } catch (error) {
      console.log(error);
    }
  }

  async employeeBy(id: string): Promise<EmployeeDto | any> {
    return this.employeeModel.findOne({ id }).exec();
  }
  async getEmployees(): Promise<Employee[] | null | any> {
    return this.employeeModel
      .find({ deletedAt: null })
      .select('-deletedAt --created -birthday -updatedAt -__v -__t -cover_letter -resume_file -school_end_date -school_start_date -cityzenship');

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
  async addEmployee(employeeDto: EmployeeDto): Promise<EmployeeDto | null> {
    employeeDto['email'] = this.createEmail(employeeDto.name);
    try {
      const createdemployee = new this.employeeModel(employeeDto);
      const result = await createdemployee.save();
      log({ result });
      return result.toObject();
    } catch (er) {
      error(er);
      return null;
    }
  }

  async add_education(employeeID: string, education: EducationDTO): Promise<EducationDTO | null> {
    education.id = uniqid();
    log({ education: JSON.stringify(education) });
    try {
      await this.employeeModel.findByIdAndUpdate(employeeID, { $push: { educations: JSON.parse(JSON.stringify(education)) } }).exec();
      return education;
    } catch (er) {
      log(er);
      return;
    }
    return;
  }
  async add_experience(employeeID: string, experience: ExperienceDto): Promise<Employee | void> {
    experience.id = uniqid();
    log('BUZE2: ', JSON.stringify(experience));
    return await this.employeeModel.findByIdAndUpdate(employeeID, { $push: { experiences: JSON.parse(JSON.stringify(experience)) } }).exec();
  }
  async add_contact(employeeID: string, contact: ContactDto): Promise<Map<string, string> | null> {
    contact.id = uniqid();
    log({ contact });
    try {
      const result = await this.employeeModel.findByIdAndUpdate(employeeID, { $push: { emergencyContacts: contact } }).exec();
      if (result) {
        return result.emergencyContacts.find(c => c['id'] === contact.id);
      }
      return;
    } catch (error) {
      return error;
    }
  }
  async updateBiography(employeeID: string, biography: string): Promise<string | null> {
    try {
      const result = await this.employeeModel.findByIdAndUpdate(employeeID, { $set: { biography } }).exec();
      if (result != null) return result.biography;
      return;
    } catch (er) {
      console.log(er);
      return;
    }
  }
  async updateOnboarding(employeeID: string, onboarding: string): Promise<Record<string, unknown>[] | null> {
    try {
      const result = await this.employeeModel.findByIdAndUpdate(employeeID, { $set: { onboarding } }).exec();
      if (result != null) return result.onboarding;
      return;
    } catch (er) {
      console.log(er);
      return;
    }
  }
  async delete_employee(id: string): Promise<any> {
    return await this.employeeModel.findOneAndRemove({ id }).exec();
  }
  async delete_education(employeeID: string, educationID: string): Promise<boolean | any | null> {
    try {
      const result = await this.employeeModel
        .updateOne(
          { id: employeeID },
          {
            $pull: { educations: { id: educationID } },
          },
          { runValidators: true, select: 'educations -_id' },
        )
        .exec();
      log(result);
      // if (result) return result.educations.find(educ => educ['id'] == educationID) == null;
      // return null;
      return result.modifiedCount >= 1;
    } catch (er) {
      return er;
    }
  }
  async delete_experience(employeeID: string, experienceID: string): Promise<boolean | any | null> {
    try {
      const result = await this.employeeModel
        .findByIdAndUpdate(
          employeeID,
          {
            $pull: { experiences: { id: experienceID } },
          },
          { runValidators: true, select: 'experiences -_id' },
        )
        .exec();
      log({ result });
      if (result) result.experiences.find(exp => exp['id'] == experienceID) == null;
      return null;
    } catch (error) {
      return error;
    }
  }
  async delete_contact(employeeID: string, contactID: string): Promise<boolean | any | null> {
    try {
      const result = await this.employeeModel
        .findByIdAndUpdate(
          employeeID,
          {
            $pull: { emergencyContacts: { id: contactID } },
          },
          { runValidators: true, select: 'emergencyContacts -_id' },
        )
        .exec();
      log({ result });
      if (result) result.emergencyContacts.find(c => c['id'] == contactID) == null;
      return null;
    } catch (error) {
      return error;
    }
  }
  async remove_skills(employeeID: string, skill: string | string[]): Promise<Employee | void> {
    return await this.employeeModel
      .findByIdAndUpdate(employeeID, {
        $pull: { skills: { skill } },
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
    return this.employeeModel.find({ deletedAt: null });
  }
}
