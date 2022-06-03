import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Name } from 'src/export.type';
import { BaseMemberSchema } from 'src/member.base';

export type EmployeeDocument = Employee & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Employee extends BaseMemberSchema {}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.pre('save', () => {
  // console.log('Pre-save DocumentOrg is : ', this);
});
