import { Transform } from 'class-transformer';
import { Schema as S } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from './export.type';
import { differenceInYears } from 'date-fns';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsEmail, IsNotEmpty, isPhoneNumber, IsString, MaxLength, MinLength, ValidateIf, IsArray, IsNumber, isEmail } from 'class-validator';
import validator from 'validator';
import PhoneNumber from 'awesome-phonenumber';

// use awesome-phonenumber

@Schema({ timestamps: true, _id: true, autoIndex: true, discriminatorKey: 'type' })
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
    unique: true,
    validate: {
      validator: function (v: string[] | string): boolean {
        if (Array.isArray(v)) {
          return v.some(v => validator.isEmail(v));
        } else {
          return validator.isEmail(v);
        }
      },
      message: props => `${props.value} contains invalid email!`,
    },
  })
  email: string[];

  @Prop({ type: String, default: null })
  profile_image: string | null;

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

  @Prop({ type: Date, default: null })
  deleteAt: Date | null;
}
const P: S = SchemaFactory.createForClass(Person);
P.virtual('name').get(function () {
  return this.first_name + ' ' + this.middle_name + ' ' + this.last_name;
});
export const PersonSchema = P;
export class addressDto {
  @ApiProperty()
  @IsString()
  avenue: string;

  @IsString()
  @ApiProperty()
  quartier?: string;

  @ApiProperty()
  @IsString()
  commune: string;

  @ApiProperty()
  @IsString()
  ville?: string;

  @ApiProperty()
  numero?: string;

  @ApiProperty()
  @IsNumber({ allowNaN: true })
  zip_code?: number;
}
export class PersonDto {
  // create data transfer object for Teacher class

  @ApiProperty({ type: String, description: 'The first name', example: ['Franck Kessler', 'Paul George'] })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ type: String, description: 'The middle name', example: ['Franck Kessler', 'Paul George'] })
  @IsNotEmpty()
  middle_name: string;

  @ApiProperty({ type: String, description: 'The last name (Family)', example: ['Franck Kessler', 'Paul George'] })
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
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    } else {
      return [value];
    }
  })
  @ValidateIf((obj, value) => {
    if (Array.isArray(value)) {
      return value.some(v => !isEmail(v));
    } else {
      return isEmail(value);
    }
  })
  // @IsEmail({ message: ({ value }) => `${value} is not a valid email` })
  email: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1, { message: ({ property }) => `The length of ${property} must be 1` })
  @ValidateIf((o, value) => ['M', 'F'].includes(value), {
    message: ({ value }) => `${value} not in ${['M', 'F']}`,
  })
  gender: string;

  @ApiProperty({ type: Date, description: 'Birthday' })
  @Transform(v => new Date(v.value).toISOString())
  @IsDateString({}, { message: ({ value, property }) => `${value} for ${property} is not valid date string` })
  @ValidateIf(o => differenceInYears(new Date(), o.birthay) <= 19, {
    message: pr => 'Apparement vous avez moins de 19 ans',
  })
  birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2, { message: ({ value }) => `${value} is not equal or upper 2 characters` })
  @MaxLength(3, { message: ({ value }) => `${value} is not equal or under 3 characters` })
  cityzenship: string;

  @ApiProperty({ description: 'Address of person' })
  @IsNotEmpty()
  address: addressDto;
}
