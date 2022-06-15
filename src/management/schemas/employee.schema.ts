import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Name } from 'src/export.type';
import { BaseMemberSchema } from 'src/member.base';

export type EmployeeDocument = Employee & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Employee extends BaseMemberSchema {
  @Prop({ type: String })
  profile_img: string;

  @Prop({ type: String })
  fonction: string;

  @Prop({ type: String })
  resume_file: string;

  @Prop({ type: String })
  school_name: Name;

  @Prop({ type: Date })
  school_start_date: Date;

  @Prop({ type: Date })
  school_end_date: Date;

  @Prop({ type: String })
  school_diploma_name: string;

  @Prop({ type: String })
  school_diploma_file: string;

  @Prop({ type: String })
  cover_letter: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.pre('save', () => {
  // console.log('Pre-save DocumentOrg is : ', this);
});
