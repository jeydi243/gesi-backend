import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as S, Document } from 'mongoose';

@Schema({ _id: true, timestamps: true, autoIndex: true })
export class Course extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Teacher' })
  author: S.Types.ObjectId;

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
        console.log(
          `Ce champ(${v}) n'as pas pu etre convertie en date car son c'est une instance de ${v.constructor.name}`,
        );
      }
    },
  })
  expireDate?: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
