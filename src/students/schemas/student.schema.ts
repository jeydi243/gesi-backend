import { HighSchool } from './highschool.schema';
import { Responsable } from './responsable.schema';
import { Document, Schema as S } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ListLevel, ListStatus, DocumentOrganisation } from 'src/config/export.type';

// export type StudentDocument = Student & Document;

@Schema({})
export class Student extends Document {
  @Prop({ required: false })
  matricule: string;

  @Prop({
    type: [{ type: S.Types.ObjectId, ref: 'Responsable' }],
  })
  responsables: Responsable[];

  @Prop({
    type: String,
    required: false,
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
    required: false,
    default: 'Prépa',
    validate: {
      validator: function (value: string) {
        return ListLevel.includes(value);
      },
      message: ({ value }) => `${value} n'est pas valide - ${ListLevel}!`,
    },
  })
  level: string;

  @Prop({ type: [{ type: S.Types.ObjectId, ref: 'HighSchool' }] })
  highSchool: HighSchool;

  @Prop({ required: true, default: 'Etudiant' })
  documents: DocumentOrganisation[];
}

export const StudentSchema: S = SchemaFactory.createForClass<Student>(Student);

StudentSchema.pre('save', () => {
  console.log('Pre-save Student is : ', this);
});

StudentSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
});
