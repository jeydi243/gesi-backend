import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
@Schema({ timestamps: true, _id: true, autoIndex: true, id: true })
export class Assignment extends Document {
  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Employee' })
  employee_id: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Position' })
  position_id: string;

  @Prop({ required: true, type: Date })
  from: Date;

  @Prop({ required: false, type: Date, default: null })
  to: Date | null;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const AssignmentSchema = SchemaFactory.createForClass<Assignment>(Assignment);
