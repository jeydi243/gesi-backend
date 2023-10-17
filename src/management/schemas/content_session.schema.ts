import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ContentSession extends Document {
  @Prop({ required: true })
  lecturer: string;
}

export const ContentSessionSchema = SchemaFactory.createForClass<ContentSession>(ContentSession);
