import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

export type DocumentOrgDocument = DocumentOrg & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class DocumentOrg {
  @Prop({ required: true, type: String })
  code: string;

  @Prop({ required: true, type: String })
  name: string;
}

export const DocumentOrgSchema = SchemaFactory.createForClass(DocumentOrg);

DocumentOrgSchema.pre('save', () => {
  console.log('Pre-save DocumentOrg is : ', this);
});
