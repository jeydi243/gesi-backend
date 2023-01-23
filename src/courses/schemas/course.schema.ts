import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as S, Document } from 'mongoose';
import { Teacher, TeacherSchema } from 'src/teachers/schemas/teacher.schema';

@Schema({ _id: true, timestamps: true, autoIndex: true })
export class Course extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: false })
  images: Record<string, any>[];

  @Prop({ required: true, type: [TeacherSchema], ref: 'Teacher' })
  authors: Teacher[];

  @Prop({ required: true, type: String, length: [30, 500] })
  description: string;

  @Prop({
    type: Date,
    set: (v: any) => {
      if (typeof v == 'string') {
        return new Date(v as string);
      } else if (v instanceof Date) {
        return v;
      } else {
        console.log(`Ce champ(${v}) n'as pas pu etre convertie en date car son c'est une instance de ${v.constructor.name}`);
      }
    },
  })
  expiredate?: Date | null;

  @Prop({ required: false, type: [String] })
  tags: string[];

  @Prop({ required: true, type: [] })
  parts: [];

  @Prop({ required: true, type: String })
  createdBy: string;
}

export const CourseSchema: S = SchemaFactory.createForClass<Course>(Course);
