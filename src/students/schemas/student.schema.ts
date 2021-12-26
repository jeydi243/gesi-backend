import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Name } from '../dto/create-student.dto';
import validator from 'validator';
import { Responsable } from './responsable.schema';
export type StudentDocument = Student & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Student {
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
      message: (props) => `${props.value} n'est pas un numero valide!`,
    },
  })
  telephone: string[];

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

  @Prop({
    type: Date,
    required: true,
    get: (v: any) => {
      return v.toISOString();
    },
    set: (v: any) => {
      if (typeof v == 'string') {
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
  cityzenship: string;

  @Prop({
    type: [{ type: S.Types.ObjectId, ref: 'Responsable' }],
  })
  responsables: Responsable[];

  @Prop({
    type: String,
    required: true,
    default: 'Candidat',
    validate: {
      validator: function (value: string) {
        const listStatut: string[] = [
          'Candidat',
          'Etudiant',
          'Diplomé',
          'Abandon',
          'Renvoi',
        ];
        return listStatut.includes(value);
      },
      message: (props) => `${props.value} n'est pas valide!`,
    },
  })
  statut: string;

  @Prop({
    type: String,
    required: true,
    default: 'Prépa',
    validate: {
      validator: function (value: string) {
        const listNiveau: string[] = ['Prépa', 'G1', 'G2', 'G3'];
        return listNiveau.includes(value);
      },
      message: (props) => `${props.value} n'est pas valide!`,
    },
  })
  niveau: string;

  @Prop({ type: [{ type: S.Types.ObjectId, ref: 'HighSchool' }] })
  highSchool: Map<string, string>;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
