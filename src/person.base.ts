import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  isPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import validator from 'validator';
import { Genre, Name } from './export.type';

@Schema({ timestamps: true, _id: true, autoIndex: true })

export class Person {
  @Prop({
    required: true,
    minlength: 2,
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
      validator: function (tels: string[]) {
        return tels.every((tel: string) => {
          return isPhoneNumber(tel);
        });
      },
      message: props => `${props.value} un des numéros n'est pas un numero valide!`,
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
  personalEmail: number;

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

export const PersonSchema = SchemaFactory.createForClass(Person);



export class PersonDto {
  // create data transfer object for Teacher class
  @ApiProperty()
  @IsNotEmpty()
  name: string | Name;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(
    o => {
      if (Array.isArray(o.telephones)) {
        return o.telephones.every(tel => isPhoneNumber(tel, o.cityzenship));
      }
      return isPhoneNumber(o.telephones, o.cityzenship);
    },
    { message: "Le numero de telephone($value) n'est pas valide!" },
  )
  telephones: string[] | string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(o => o.email != o.personalEmail, { message: "$value doit etre différent de l'Email de l'Etablissement" })
  @IsEmail()
  personalEmail: string | Name;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(o => o.email != o.personalEmail, { message: "$value doit etre différent de l'Email personel" })
  @IsEmail()
  email: string | Name; //Email fourni par l'établissement

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1, { message: "$value n'est pas M ou F" })
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @Transform(v => new Date(v.value))
  @IsDateString({ message: "$value n'est pas une date valide" })
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
