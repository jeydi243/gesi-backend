import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ timestamps: true, _id: true, autoIndex: true, id: true })
export class Organization extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, maxlength: 10 })
  code: string;

  @Prop({ type: String, maxlength: 500 })
  description: string;

  @Prop({ type: S.Types.ObjectId, ref: 'Lookups' })
  lookup_id: string;

  @Prop({ type: Date, required: false })
  end_date: Date | null;

  @Prop({ type: Date, required: false })
  created: Date;

  @Prop({ type: String, required: false, default: null })
  organization_parent_id: string | null;

  @Prop({ type: String, required: true })
  createdBy: string;
}
export const OrganizationSchema: S = SchemaFactory.createForClass<Organization>(Organization);
