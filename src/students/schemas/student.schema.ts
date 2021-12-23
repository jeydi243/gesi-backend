import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Name } from '../dto/create-student.dto';
import validator from 'validator';
import { Responsable } from './responsable.schema';
export type StudentDocument = Student & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Student {
  @Prop({ required: false, type: S.Types.ObjectId, auto: true })
  id: number;

  @Prop({ required: false })
  matricule: number;

  @Prop({ required: true, minlength: 6, maxlength: 20, type: String })
  name: string | Name;

  @Prop({
    required: true,
    validate: {
      validator: function (v: any) {
        return validator.isMobilePhone(v);
      },
      message: (props) => `${props} n'est pas un numero valide!`,
    },
  })
  telephone: number[] | string[];

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

  @Prop({
    type: Date,
    required: true,
    get: (v: any) => {
      return v.toISOString();
    },
    set: (v: any) => {
      if (v instanceof String) {
        return new Date(v as string);
      } else if (v instanceof Date) {
        return v;
      } else {
        console.log(
          `Ce champ(${v}) n'as pas pu etre convertie en date car son c'est une instance de ${v.constructor.name}`,
        );
      }
    },
  })
  birthDate: Date;

  @Prop({ type: String, required: true, default: 'Congo (RDC)' })
  cityzenship: Date;

  @Prop({
    type: [{ type: S.Types.ObjectId, ref: 'Responsable' }],
  })
  responsables: Responsable[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
