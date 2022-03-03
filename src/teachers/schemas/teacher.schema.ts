import { Document, Schema as S } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseMemberSchema } from 'src/member.base';
export type TeacherDocument = Teacher & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Teacher extends BaseMemberSchema {
  @Prop({ required: false, type: S.Types.ObjectId })
  matricule: number;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
