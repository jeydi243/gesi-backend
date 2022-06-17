import { Document, Schema as S } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop({ required: false, type: S.Types.ObjectId, unique: true })
  matricule: S.Types.ObjectId;

  @Prop({ required: true, minlength: 300 })
  resume_file: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

// TeacherSchema.pre('save', () => {
//   console.log('Pre-save Teacher is : ', this);
// });
