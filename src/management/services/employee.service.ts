import { log } from 'console';
import * as uniqid from 'uniqid';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { Employee } from '../schemas/employee.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeDTO } from '../dto/employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';
import { UpdateEducationDTO } from '../dto/update-education.dto';
import { UpdateExperienceDTO } from '../dto/update-experience.dto';
import ContactDTO from '../dto/contact.dto';
import EducationDTO from '../dto/education.dto';
import ExperienceDTO from '../dto/experience.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmployeeService {
  organisationName = 'test';
  organisationDomain = 'test.org';
  constructor(@InjectModel('Employee') private employeeModel: Model<Employee>, @InjectModel('User') private userModel: Model<User>, private userService: UsersService) {
    // employeeModel.watch().on('change', function (data) {
    //   console.log("You add new employee must create also password");
    // });
  }
  async updateProfileImage(employeeID: string, resource_id: string): Promise<boolean | string> {
    try {
      const resp = await this.employeeModel.findOneAndUpdate({ id: employeeID }, { $set: { profile_image: resource_id } }).exec();
      if (!resp) return `Aucun employee avec l'ID ${employeeID}`;
      if (resp['profile_image'] != null) return resp['profile_image'] != null;
    } catch (error) {
      console.log(error);
      return error['message'];
    }
  }
  async updateDocument(employeeID: string, docname: string, link: string) {
    const emp = await this.employeeModel.findOne({ id: employeeID }).exec();
    emp[docname] = link;
    emp.save();
    return {};
  }
  async updateEducation(employeeID: string, education: UpdateEducationDTO): Promise<[] | null | any> {
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
  async updateExperence(employeeID: string, experience: UpdateExperienceDTO): Promise<UpdateExperienceDTO[] | null | any> {
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
  async employeeBy(id: string): Promise<EmployeeDTO | any> {
    return this.employeeModel.findOne({ id }).exec();
  }
  async getEmployees(): Promise<Employee[] | null | any> {
    return this.employeeModel
      .find({ deletedAt: null })
      .select('-deletedAt --created -birthday -updatedAt -__v -__t -cover_letter -resume_file -school_end_date -school_start_date -cityzenship');

    // .projection({ deletedAt: 0, cover_letter: 0, resume: 0, school_diploma: 0 })
  }
  createEmail(first_name: string, last_name: string, middle_name: string): string[] {
    let email = '';
    email = last_name?.split(' ')[0] + '.' + middle_name?.split(' ')[0] || first_name?.split(' ')[0];

    // const currentyear = new Date().getFullYear();
    email = email + '@' + this.organisationDomain;
    return [email];
  }
  getUsername(employeeDTO: EmployeeDTO): string {
    const { last_name, middle_name, first_name } = employeeDTO;

    return last_name[0] + middle_name[0] + first_name[0] + 2022;
  }
  async addEmployee(employeeDTO: EmployeeDTO): Promise<Record<string, unknown> | null> {
    // console.log(employeeDTO);

    employeeDTO['email'] = this.createEmail(employeeDTO.first_name, employeeDTO.last_name, employeeDTO.middle_name);
    try {
      const createdemployee = new this.employeeModel(employeeDTO);
      const result = await createdemployee.save();
      log({ result });
      return await this.userService.register({ role_id: result.id, username: this.getUsername(employeeDTO), roles: ['EMPLOYEE'] });
      // return result.toObject();
    } catch (er) {
      log(er);
      return er;
    }
  }
  async updatePassword(employeeID: string, password: string): Promise<boolean | null> {
    try {
      const user = await this.userModel.findOne({ idOfRole: employeeID }).exec();
      console.log({ user });
      if (user) {
        user.password = password;
        await user.save();
      }
      return false;
    } catch (err) {
      console.log(err);
    }
    return true;
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
  async add_experience(employeeID: string, experience: ExperienceDTO): Promise<Employee | void> {
    experience.id = uniqid();
    log('BUZE2: ', JSON.stringify(experience));
    return await this.employeeModel.findByIdAndUpdate(employeeID, { $push: { experiences: JSON.parse(JSON.stringify(experience)) } }).exec();
  }
  async add_contact(employeeID: string, contact: ContactDTO): Promise<ContactDTO | null> {
    contact.id = uniqid();
    log({ contact });
    try {
      const result = await this.employeeModel.findByIdAndUpdate(employeeID, { $push: { emergencyContacts: JSON.parse(JSON.stringify(contact)) } }).exec();
      if (result) {
        return contact;
      }
      return null;
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
      // const result = await this.employeeModel
      //   .updateOne(
      //     { id: employeeID },
      //     {
      //       $pull: { educations: { id: educationID } },
      //     },
      //     { runValidators: true, select: 'educations -_id' },
      //   )
      //   .exec();
      const result = await this.employeeModel
        .findByIdAndUpdate(
          employeeID,
          {
            $pull: { educations: { id: educationID } },
          },
          { runValidators: true, select: 'educations -_id' },
        )
        .exec();

      log({ result });
      if (result) return result.educations.find(educ => educ['id'] == educationID) == null;
      // return null;
      // return result.modifiedCount >= 1;
    } catch (er) {
      log({ er });
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
  async updateEmployee(employeeID: string, employeeUpdate: UpdateEmployeeDTO): Promise<Employee | null | string> {
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
