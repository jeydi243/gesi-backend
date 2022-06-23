import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import validator from 'validator';


@Schema({ autoIndex: true, timestamps: true })
export class EtablissementSecondaire extends Document {
  @Prop({ required: false, type: S.Types.ObjectId, auto: true })
  id: number;

  @Prop({ required: true, minlength: 3, maxlength: 50, type: String })
  name: string;

  @Prop({
    required: true,
    validate: {
      validator: function (v: any) {
        return validator.isMobilePhone(v);
      },
      message: props => `${props} n'est pas un numero valide!`,
    },
    set: (v: any) => {
      return v.replace(/\D/g, '');
    },
  })
  telephone: number[] | string[];

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
}

export const EtablissementSecondaireSchema = SchemaFactory.createForClass(EtablissementSecondaire);

// EtablissementSecondaireSchema.pre('save', () => {
//   console.log('Pre-save Etablissement is : ', this);
// });
