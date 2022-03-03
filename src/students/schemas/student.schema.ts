import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Responsable } from './responsable.schema';
import { HighSchool } from './highschool.schema';
import { BaseMemberSchema } from 'src/member.base';
export type StudentDocument = Student & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Student extends BaseMemberSchema {
  @Prop({ required: false, type: S.Types.ObjectId })
  matricule: number;

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
        const listStatut: string[] = ['Candidat', 'Etudiant', 'Diplomé', 'Abandon', 'Renvoi'];
        return listStatut.includes(value);
      },
      message: props => `${props.value} n'est pas valide!`,
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
      message: props => `${props.value} n'est pas valide!`,
    },
  })
  niveau: string;

  @Prop({ type: [{ type: S.Types.ObjectId, ref: 'HighSchool' }] })
  highSchool: HighSchool;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
