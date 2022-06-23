import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

// export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher extends Document{
  @Prop({ required: false, type: S.Types.ObjectId, unique: true })
  matricule: S.Types.ObjectId;

  @Prop({ required: true, minlength: 300 })
  resume_file: string;
}

export const TeacherSchema: S = SchemaFactory.createForClass<Teacher>(Teacher);

// TeacherSchema.pre('save', () => {
//   console.log('Pre-save Teacher is : ', this);
// });
