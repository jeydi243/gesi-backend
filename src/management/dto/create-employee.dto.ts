import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {  IsEmail, isString, IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Name } from 'src/export.type';
import { PersonDto } from '../../person.base';

export class EmployeeDto extends PersonDto {
  // @ApiProperty()
  // resume_file: File | Blob;
  // @ApiProperty()
  // profile_img: File | Blob;
  // @ApiProperty()
  // school_diploma_file: File | Blob;
  @ApiProperty({ type: String, maxLength: 20, description: "Le nom de l'ecole/universite " })
  @MinLength(5)
  @MaxLength(30, {
    message: ({ value, property, object }) =>
      `${property} n'as que ${value.length} le nombre de caractere maximum est ${object}`,
  })
  school_name: string;

  @ApiProperty({ type: String, maxLength: 100, description: 'Le type de diplome obtenu' })
  @MinLength(5)
  @MaxLength(30, {
    message: ({ value, property, object }) =>
      `${property} n'as que ${value.length} le nombre de caractere maximum est ${object}`,
  })
  school_diploma_name: string;

  @ApiProperty({ type: Date, description: 'Date de début des études', required: true })
  @Transform(v => new Date(v.value))
  @ValidateIf(o => o.school_start_date < o.school_end_date && !(o.school_start_date <= o.birthay))
  school_start_date: Date;

  @ApiProperty({ type: Date, description: 'La date de fin des etudes' })
  @Transform(v => new Date(v.value))
  @ValidateIf(o => o.school_end_date > o.school_start_date)
  school_end_date: Date;

  @IsString()
  @MinLength(5, {
    message: ({ value, property, constraints }) =>
      `${property} have ${value.length} characters, but minimum is ${constraints[0]}`,
  })
  @MaxLength(500, {
    message: ({ value, property, constraints }) =>
      `${property} have ${value.length} characters, but maximum is ${constraints[0]}`,
  })
  @ApiProperty({ description: 'Lettre de motivation' })
  cover_letter: string;

  @MaxLength(30, { message: 'Le maximum  de caracteres permis est 30' })
  @ApiProperty({ description: "Domaine d'application", examples: ['Math', 'Technique'] })
  domain: string | string[];

  @ApiProperty({ description: 'Personal Email' })
  @IsEmail()
  personal_email: string;

  @MaxLength(300)
  @MinLength(3, {
    message: ({ value, property, constraints }) =>
      `${property} n'as que ${value} le nombre de caractere minimum est ${constraints[0]}`,
  })
  @ApiProperty({
    examples: ['Directeur Financier', 'Developpeur Web'],
    description: 'Position in company',
    required: true,
  })
  @ValidateIf(object => object.length <= 3 && object.every(pos => isString(pos)))
  // @IsArray({ each: true })
  position: string[];
}
