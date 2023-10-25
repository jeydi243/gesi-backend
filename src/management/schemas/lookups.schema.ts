import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ timestamps: true, _id: true, autoIndex: true })
export class Lookups extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Classe' })
  classe_id: string;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const LookupsSchema = SchemaFactory.createForClass<Lookups>(Lookups);
