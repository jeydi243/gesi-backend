import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Filiere extends Document {
  @Prop({ required: true, type: String, unique: true, immutable: true })
  code: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: S.Types.ObjectId })
  manager: string;

  @Prop({ type: S.Types.ObjectId })
  sub_manager: string;
}

export const FiliereSchema: S = SchemaFactory.createForClass<Filiere>(Filiere);

// FiliereSchema.pre('save', () => {
//   console.log('Pre-save FiliereSchema is : ', this);
// });
