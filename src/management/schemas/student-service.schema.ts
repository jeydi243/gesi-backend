import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class StudentService extends Document {
  @Prop({ required: true, type: String, unique: true, immutable: true })
  code: string;

  @Prop({ required: true, type: S.Types.ObjectId, ref: 'Student' })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: Map<string, string> })
  contact: Record<string, string>;

  @Prop({ type: String })
  availability: string;

  @Prop({ type: String, default: null })
  deletedAt: Date | null;
}

export const StudentServiceSchema: S = SchemaFactory.createForClass<StudentService>(StudentService);

// DocumentOrgSchema.pre('save', () => {
//   // console.log('Pre-save DocumentOrg is : ', this);
// });
