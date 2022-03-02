import { Document, Schema as S } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMember } from 'src/member.abstract';
export type ProfessorDocument = Teacher & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Teacher extends AbstractMember {
  @Prop({ required: false, type: S.Types.ObjectId })
  matricule: number;
}

export const ProfessorSchema = SchemaFactory.createForClass(Teacher);