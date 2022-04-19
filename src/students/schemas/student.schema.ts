import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Responsable } from './responsable.schema';
import { HighSchool } from './highschool.schema';
import { BaseMemberSchema } from 'src/member.base';
import { ListLevel, ListStatus, DocumentOrganisation } from 'src/export.type';
export type StudentDocument = Student & Document;

@Schema({ autoIndex: true, timestamps: true, _id: true })
export class Student extends BaseMemberSchema {
  @Prop({ required: false })
  matricule: string;

  @Prop({
    type: [{ type: S.Types.ObjectId, ref: 'Responsable' }],
  })
  responsables: Responsable[];

  @Prop({
    type: String,
    required: true,
    default: 'CANDIDAT',
    validate: {
      validator: function (value: string) {
        return ListStatus.includes(value);
      },
      message: props => `${props.value} doit correspondre a une des valeurs suivante(CASE sensitive) - ${ListStatus}!`,
    },
  })
  status: string;

  @Prop({
    type: String,
    required: true,
    default: 'Prépa',
    validate: {
      validator: function (value: string) {
        return ListLevel.includes(value);
      },
      message: props => `${props.value} n'est pas valide - ${ListLevel}!`,
    },
  })
  level: string;

  @Prop({ type: [{ type: S.Types.ObjectId, ref: 'HighSchool' }] })
  highSchool: HighSchool;

  @Prop({ required: true, default: 'Etudiant' })
  documents: DocumentOrganisation[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.pre('save', () => {
  console.log('Pre-save Student is : ', this);
});
