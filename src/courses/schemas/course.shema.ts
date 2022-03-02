import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as S } from 'mongoose';

@Schema({ _id: true, timestamps: true, versionKey: true, autoIndex: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Teacher' })
  author: string;

  @Prop({ required: true })
  description: string;
}
