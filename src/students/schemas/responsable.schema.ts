import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Name } from 'src/export.type';
import validator from 'validator';

// export type ResponsableDocument = Responsable & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Responsable extends Document {
  @Prop({ required: false, type: S.Types.ObjectId, auto: true })
  id: number;

  @Prop({ required: true, minlength: 6, maxlength: 20, type: String })
  name: string | Name;

  @Prop({
    required: true,
    validate: {
      validator: function (v: string[]) {
        return v.every((tel: string) => {
          return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(tel);
        });
      },
      message: props => `${props} n'est pas un numero valide!`,
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

export const ResponsableSchema: S = SchemaFactory.createForClass<Responsable>(Responsable);

// ResponsableSchema.pre('save', () => {
//   console.log('Pre-save Responsable is : ', this);
// });
