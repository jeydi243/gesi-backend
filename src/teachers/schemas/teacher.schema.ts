import { Document, Schema as S } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseMemberSchema } from 'src/member.base';
export type TeacherDocument = Teacher & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Teacher extends BaseMemberSchema {
  @Prop({ required: false, type: S.Types.ObjectId, unique: true })
  matricule: number;

  @Prop({ required: true, minlength: 300 })
  resume: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

TeacherSchema.pre('save', () => {
  console.log('Pre-save Teacher is : ', this);
});
