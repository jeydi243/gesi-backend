import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema()
export class Organization extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, maxlength: 10 })
  code: string;

  @Prop({ type: String, maxlength: 500 })
  description: string;

  @Prop({ type: Date, required: false })
  date_desactivation: Date | null;

  @Prop({ type: Date, required: true })
  date_creation: Date;

  @Prop({ type: String, required: false })
  organization_parent_id: string | null;
}
export const OrganizationSchema: S = SchemaFactory.createForClass<Organization>(Organization);
