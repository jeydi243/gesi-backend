import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class DocumentOrg extends Document {
  @Prop({ required: true, type: String, unique: true, immutable: true })
  code: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;
}

export const DocumentOrgSchema = SchemaFactory.createForClass(DocumentOrg);

// DocumentOrgSchema.pre('save', () => {
//   // console.log('Pre-save DocumentOrg is : ', this);
// });
