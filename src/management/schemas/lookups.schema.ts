import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Lookups extends Document {
  @Prop({ required: true, type: String, unique: true, immutable: true,})
  code: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: S.Types.ObjectId, ref: 'Classe' })
  classe_id: string;

  @Prop({ type: String, required: true, maxlength: 100 })
  description: string;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;

  @Prop({
    type: { type: S.Types.ObjectId, ref: 'Person' },
  })
  createdBy?: string;
}

export const LookupsSchema: S = SchemaFactory.createForClass<Lookups>(Lookups);
