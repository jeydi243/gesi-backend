import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Student {
  @Prop({ required: true, minlength: 3, maxlength: 20 })
  name: string;

  @Prop({ required: true, min: 18, maxlength: 25 })
  age: number;

  @Prop()
  breed: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
