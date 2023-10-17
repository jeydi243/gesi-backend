import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Lookups extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  classe_id: string;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const LookupsSchema = SchemaFactory.createForClass<Lookups>(Lookups);
