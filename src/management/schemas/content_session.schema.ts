import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: true, id: true })
export class ContentSession extends Document {
  @Prop({ required: true })
  lecturer: string;
}

export const ContentSessionSchema = SchemaFactory.createForClass<ContentSession>(ContentSession);
