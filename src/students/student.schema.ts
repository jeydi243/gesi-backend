import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import { Name } from './dto/create-student.dto';
import validator from 'validator';
export type StudentDocument = Student & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Student {
  @Prop({ required: true, type: Number, auto: true })
  id: number;

  @Prop({ required: true, minlength: 6, maxlength: 20, type: String })
  name: string | Name;

  @Prop({
    required: true,
    validate: {
      validator: function (v: any) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    type: String,
  })
  personalEmail: number;

  @Prop({
    required: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} n'est pas un numero valide!`,
    },
  })
  telephone: [number, 'Le Numero de telephone est important'];

  @Prop({
    required: true,
    validate: {
      validator: function (v: any) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  })
  email: string;

  @Prop({ type: Date, required: true })
  birthDate: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
