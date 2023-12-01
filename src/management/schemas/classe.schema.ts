import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true, _id: true, autoIndex: true, id: true })
export class Classe extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const ClasseSchema = SchemaFactory.createForClass<Classe>(Classe);
