import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class CourseSession extends Document {
  @Prop({ required: true })
  lecturer: string;
}

export const CourseSessionSchema = SchemaFactory.createForClass<CourseSession>(CourseSession);
