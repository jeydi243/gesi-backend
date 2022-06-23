import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop({ type: String })
  profile_img: string;

  @Prop({ type: String })
  fonction: string;

  @Prop({ type: String })
  resume_file: string;

  @Prop({ type: String })
  school_name: string;

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

// EmployeeSchema.pre('save', () => {
// console.log('Pre-save DocumentOrg is : ', this);
// });
