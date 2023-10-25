import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
@Schema({ autoIndex: true, timestamps: true, _id: true })
export class ServiceRequest extends Document {

  @Prop({ required: true, type: String, ref: 'StudentService' })
  service_id: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Student' })
  student_id: string;

  @Prop({ required: true, type: Date })
  request_date: Date;

  @Prop({ required: true, type: Date })
  completion_date: Date;

  @Prop({ required: true, type: [S.Types.ObjectId], ref: 'Resource' })
  attachments: string[];

  @Prop({ type: String })
  request_status: string;

  @Prop({ type: String })
  priority: string;

  @Prop({ type: String })
  up_required: string;

  @Prop({ type: S.Types.ObjectId, ref: 'People' })
  assigned_staff: string;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const ServiceRequestSchema: S = SchemaFactory.createForClass<ServiceRequest>(ServiceRequest);

// DocumentOrgSchema.pre('save', () => {
//   // console.log('Pre-save DocumentOrg is : ', this);
// });
