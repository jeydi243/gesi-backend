import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as S } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { differenceInYears } from 'date-fns';
import * as APN from 'awesome-phonenumber';
import PhoneNumber from 'awesome-phonenumber';

import { IsDateString, IsEmail, IsNotEmpty, isPhoneNumber, IsString, MaxLength, MinLength, ValidateIf, IsArray } from 'class-validator';
import validator from 'validator';
import { Genre, Name } from './export.type';

// use awesome-phonenumber

@Schema({ timestamps: true, _id: true, autoIndex: true })
export class Person {
  @Prop({
    required: true,
    minlength: 2,
    maxlength: 40,
    type: String,
    set: (v: any) => {
      if (typeof v === 'string') {
        return v.toLowerCase();
      }
    },
  })
  first_name: string;

  @Prop({
    required: true,
    minlength: 2,
    maxlength: 40,
    type: String,
    set: (v: any) => {
      if (typeof v === 'string') {
        return v.toLowerCase();
      }
    },
  })
  last_name: string;

  @Prop({
    required: true,
    minlength: 2,
    maxlength: 40,
    type: String,
    set: (v: any) => {
      if (typeof v === 'string') {
        return v.toLowerCase();
      }
    },
  })
  middle_name: string;

  @Prop({
    required: true,
    type: [String],
    validate: {
      validator: function (tels: string[]) {
        return tels.every((tel: string) => {
          // return isPhoneNumber(tel);
          return true;
        });
      },
      message: props => `${props.value} un des numéros n'est pas un numéro valide!`,
    },
  })
  telephones: string[];

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
  personal_email: number;

  @Prop({
    type: Date,
    required: true,
    get: (v: any) => {
      return v.toISOString();
    },
    // set: (v: any) => {
    //   if (typeof v == 'string') {
    //     return new Date(v as string);
    //   } else if (v instanceof Date) {
    //     return v;
    //   } else {
    //     console.log(
    //       `Ce champ(${v}) n'as pas pu etre convertie en date car son c'est une instance de ${v.constructor.name}`,
    //     );
    //   }
    // },
  })
  birthday: Date;

  @Prop({
    type: String,
    required: true,
    enum: Genre,
  })
  gender: string;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({ type: String, required: true, default: 'CD', minlength: 2, maxlength: 3 })
  cityzenship: string;
}
const P: S = SchemaFactory.createForClass(Person);
P.virtual('name').get(function () {
  return this.first_name + ' ' + this.middle_name + ' ' + this.last_name;
});
export const PersonSchema = P;

export class PersonDto {
  // create data transfer object for Teacher class

  @ApiProperty({ type: String, description: "Le prénom de l'employee", examples: ['Franck Kessler', 'Paul George'] })
  @IsNotEmpty()
  firs_name: string;

  @ApiProperty({ type: String, description: "Le postnom de l'employee", examples: ['Franck Kessler', 'Paul George'] })
  @IsNotEmpty()
  middle_name: string;

  @ApiProperty({ type: String, description: "Le nom de famille de l'employee", examples: ['Franck Kessler', 'Paul George'] })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @Transform(function ({ value, obj }) {
    return value.map(function (tel: string) {
      const pn = new PhoneNumber(tel, obj.cityzenship);
      return pn.getNumber();
    });
  })
  @ValidateIf(
    (o, tels) => {
      if (Array.isArray(tels)) {
        return tels.every(tel => isPhoneNumber(tel));
      }
      return isPhoneNumber(tels);
    },
    { message: ({ value }) => `${value} contains invalid phone(s) numbers!` },
  )
  telephones: string[] | string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(o => o.email != o.personal_email, {
    message: ({ value, object }) => `${value} must be different ${object['email']}, which is you other email`,
  })
  @IsEmail({ message: ({ value }) => `${value} is not a valid email` })
  personal_email: string | Name;

  // @ApiProperty()
  // @IsNotEmpty()
  // @ValidateIf(o => o.email != o.personal_email, { message: "$value doit etre différent de l'Email personel" })
  // @IsEmail({ message: ({ value }) => `${value} is not a valid email` })
  // email: string | Name; //Email fourni par l'établissement

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1, { message: ({ property }) => `The length of ${property} must be 1` })
  @ValidateIf((o, value) => ['M', 'F'].includes(value), {
    message: ({ value }) => `${value} not in ${['M', 'F']}`,
  })
  gender: string;

  @Transform(v => new Date(v.value).toISOString())
  @IsDateString({}, { message: ({ value, property }) => `${value} for ${property} is not valid date string` })
  @ApiProperty({ type: Date, description: 'Birthday' })
  @ValidateIf(o => differenceInYears(new Date(), o.birthay) <= 23, {
    message: pr => 'Apparement vous avez moins de 23 ans',
  })
  birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2, { message: "$value n'est pas un code de pays valide " })
  @MaxLength(3, { message: "$value n'est pas un code de pays valide " })
  cityzenship: string;

  @ApiProperty({ type: String, description: 'Address of person' })
  @IsNotEmpty()
  address: string;
}
