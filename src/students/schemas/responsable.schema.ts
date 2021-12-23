import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as S } from 'mongoose';
import { Name } from '../dto/create-student.dto';
import validator from 'validator';
export type ResponsableDocument = Responsable & Document;

@Schema({ autoIndex: true, timestamps: true })
export class Responsable {
  @Prop({ required: false, type: S.Types.ObjectId, auto: true })
  id: number;

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
      message: (props) => `${props.value} is not a valid email!`,
    },
  })
  email: string;

  @Prop({ type: Date, required: true })
  birthDate: string;
}

export const StudentSchema = SchemaFactory.createForClass(Responsable);
