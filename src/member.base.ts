import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isPhoneNumber, ValidateIf } from 'class-validator';
import validator from 'validator';
import { Name } from './export.type';

export abstract class BaseMemberSchema {
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

  @Prop({ type: String, required: true, default: 'Congo (RDC)' })
  cityzenship: string;
}

export class BaseMemberDto {
  // create data transfer object for Teacher class
  @ApiProperty()
  @IsNotEmpty()
  name: string | Name;

  @IsNotEmpty()
  @ValidateIf(o => isPhoneNumber(o.telephone))
  @ApiProperty()
  //   @isPhoneNumber(region: 'RU')
  telephone: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(o => o.email != o.personalEmail)
  @IsEmail()
  personalEmail: string | Name;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(o => o.email != o.personalEmail)
  @IsEmail()
  email: string | Name; //Email fourni par l'établissement
}
