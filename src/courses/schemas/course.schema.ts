import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as S } from 'mongoose';
export type CourseDocument = Course & Document;

@Schema({ _id: true, timestamps: true, autoIndex: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Teacher' })
  author: string;

  @Prop({ required: true })
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
