import validator from 'validator';
import { Document, Schema as S } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Name } from 'src/students/dto/create-student.dto';
export type ProfessorSchema = Professor & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Professor {
  @Prop({ required: false, type: S.Types.ObjectId })
  matricule: number;

  @Prop({ required: false, auto: true })
  id: number;

  @Prop({
    required: true,
    minlength: 6,
    maxlength: 20,
    type: String,
    set: (v: any) => {
      if (typeof v === 'string') {
        return v.toLowerCase();
      }
    },
  })
  name: string | Name;

  @Prop({
    required: true,
    type: [String],
    validate: {
      validator: function (value: string[]) {
        return value.every((tel: string) => {
          return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(tel);
        });
      },
      message: props => `${props.value} n'est pas un numero valide!`,
    },
  })
  telephone: string[];

  @Prop({
    required: true,
    validate: {
      validator: function (v: any) {
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    set: (v: any) => {
      if (typeof v === 'string') {
        return v.toLowerCase();
      }
    },
  })
  gender: string;

  @Prop({
    required: true,
    validate: {
      validator: function (v: any) {
        return validator.isEmail(v);
      },
      message: (props: any) => `${props} is not a valid email!`,
    },
    type: String,
  })
  personalEmail: number;
}

export const ProfessorSchema = SchemaFactory.createForClass(Professor);
