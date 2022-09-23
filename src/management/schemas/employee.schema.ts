import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Schema as S } from 'mongoose';
import { defaultOnboarding } from 'src/export.type';

@Schema()
export class Employee extends Document {
  @Prop({ type: String })
  profile_img: string;

  @Prop({ type: [String] })
  @Transform(({ value }) => [value])
  position: string;

  @Prop({ type: String })
  resume_file: string;

  @Prop({ type: String })
  school_name: string;

  @Prop({ type: Date })
  school_start_date: Date;

  @Prop({ type: String, unique: true })
  personal_email: string;

  @Prop({
    type: String,
    unique: true,
  })
  email: string;

  @Prop({ type: Date, required: true })
  hire_date: Date;

  @Prop({ type: Date })
  school_end_date: Date;

  @Prop({ type: String })
  school_diploma_name: string;

  @Prop({ type: String })
  school_diploma_file: string;

  @Prop({ type: String })
  cover_letter: string;

  @Prop({ type: String })
  biography: string;

  @Prop({ type: Array, required: false, default: [] })
  educations: Array<Map<string, string>>;

  @Prop({ type: Array, required: false, default: [] })
  experiences: Array<Map<string, string>>;

  @Prop({ type: Array, required: false, default: [] })
  emergencyContacts: Array<Map<string, string>>;

  @Prop({ type: Array, default: defaultOnboarding })
  onboarding: Record<string, unknown>[];

  @Prop({ type: Array, required: false })
  skills: string[];

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const EmployeeSchema: S = SchemaFactory.createForClass<Employee>(Employee);

// EmployeeSchema.pre('save', () => {
// console.log('Pre-save DocumentOrg is : ', this);
// });
