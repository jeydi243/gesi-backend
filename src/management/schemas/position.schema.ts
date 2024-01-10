import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ timestamps: true, _id: true, autoIndex: true, id: true })
export class Position extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false, type: S.Types.ObjectId, ref: 'Organization' })
  org_id: string;

  @Prop({ required: true })
  job_description: string;

  @Prop({ required: false, type: S.Types.ObjectId, ref: 'Position' })
  report_to: string;

  @Prop({ required: false, type: S.Types.ObjectId, ref: 'Lookup' })
  employment_type: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Date, required: false })
  startDate: Date;

  @Prop({ type: Date, required: false })
  endDate: Date;
}

export const PositionSchema: S = SchemaFactory.createForClass<Position>(Position);

// EmployeeSchema.pre('save', () => {
// console.log('Pre-save DocumentOrg is : ', this);
// });
