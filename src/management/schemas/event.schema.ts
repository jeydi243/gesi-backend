import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';

@Schema({ discriminatorKey: 'type' })
export class Event extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ type: Date, required: false })
  from: Date;

  @Prop({ type: Date, required: false })
  to: Date;

  @Prop({ type: String, required: false })
  recurrenceId: string;

  @Prop({ type: String, required: false })
  name: string;

  @Prop({ type: String, required: false })
  fromZone: string;

  @Prop({ type: String, required: false })
  toZone: string;

  @Prop({ type: String, required: false })
  recurrenceRule: string;

  @Prop({ type: Array, required: false })
  exceptionDates: Array<Date>;
}

export const EventSchema: S = SchemaFactory.createForClass<Event>(Event);

// EmployeeSchema.pre('save', () => {
// console.log('Pre-save DocumentOrg is : ', this);
// });
