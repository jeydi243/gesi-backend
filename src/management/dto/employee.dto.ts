import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEmail, isString, IsString, MaxLength, MinLength, ValidateIf, IsDate } from 'class-validator';
import { PersonDto } from '../../person.base';
import ExperienceDto from './experience.dto';
import ContactDto from './contact.dto';
import EducationDto from './education.dto';
import { Optional } from '@nestjs/common';

export class EmployeeDto extends PersonDto {
  // @ApiProperty()
  // resume_file: File | Blob;

  // @ApiProperty()
  // profile_img: File | Blob;

  // @ApiProperty()
  // school_diploma_file: File | Blob;
  // @ApiProperty({ type: String, maxLength: 20, description: "Le nom de l'ecole/universite " })
  // @MinLength(5)
  // @MaxLength(30, {
  //   message: ({ value, property, object }) => `${property} n'as que ${value.length} le nombre de caractere maximum est ${object}`,
  // })
  // school_name: string;

  // @ApiProperty({ type: String, maxLength: 100, description: 'Le type de diplome obtenu' })
  // @MinLength(5)
  // @MaxLength(30, {
  //   message: ({ value, property, object }) => `${property} n'as que ${value.length} le nombre de caractere maximum est ${object}`,
  // })
  // school_diploma_name: string;

  // @ApiProperty({ type: Date, description: 'Date de début des études', required: true })
  // @Transform(v => new Date(v.value))
  // @ValidateIf(o => o.school_start_date < o.school_end_date && !(o.school_start_date <= o.birthay))
  // school_start_date: Date;

  // @ApiProperty({ type: Date, description: 'La date de fin des etudes' })
  // @Transform(v => new Date(v.value))
  // @ValidateIf(o => o.school_end_date > o.school_start_date)
  // school_end_date: Date;

  @ApiProperty({ type: Date, description: "La date d'engagement" })
  @IsDate()
  @Transform(v => new Date(v.value))
  hire_date: Date;

  @IsString()
  @MinLength(5, {
    message: ({ value, property, constraints }) => `${property} have ${value.length} characters, but minimum is ${constraints[0]}`,
  })
  @MaxLength(500, {
    message: ({ value, property, constraints }) => `${property} have ${value.length} characters, but maximum is ${constraints[0]}`,
  })
  @ApiProperty({ description: 'Lettre de motivation' })
  cover_letter: string;

  @IsString()
  @MinLength(5, {
    message: ({ value, property, constraints }) => `${property} have ${value.length} characters, but minimum is ${constraints[0]}`,
  })
  @MaxLength(500, {
    message: ({ value, property, constraints }) => `${property} have ${value.length} characters, but maximum is ${constraints[0]}`,
  })
  @ApiProperty({ description: 'biography of employee' })
  biography: string;

  @MaxLength(30, { message: 'Max of characteres is 30' })
  @ApiProperty({ description: "Domaine d'application", example: ['Math', 'Technique', 'Dessin'] })
  domain: string | string[];

  @ApiProperty({ description: 'Personal Email' })
  @IsEmail()
  personal_email: string;

  @ApiProperty({ description: 'List of educations' })
  @Optional()
  // @ArrayMinSize(1)
  educations: EducationDto[];

  @ApiProperty({ description: 'List of emergency contacts' })
  @Optional()
  // @ArrayMinSize(1)
  emergencyContacts: ContactDto[];

  @ApiProperty({ description: 'List of experiences over the time' })
  @Optional()
  // @ArrayMinSize(0)
  experiences: ExperienceDto[];

  @ApiProperty({ description: 'List of skills' })
  @Transform(v => v.value.split(','))
  @Optional()
  @IsArray()
  // @ArrayMinSize(2)
  skills: string[];

  @ApiProperty({ description: 'Onboardings state of user' })
  @Optional()
  onboarding: Record<string, unknown>[];

  @MaxLength(300)
  @MinLength(3, {
    message: ({ value, property, constraints }) => `${property} n'as que ${value} le nombre de caractere minimum est ${constraints[0]}`,
  })
  @ApiProperty({
    example: ['Directeur Financier', 'Developpeur Web'],
    description: 'Position in company',
    required: true,
  })
  @ValidateIf(object => object.length <= 3 && object.every(pos => isString(pos)))
  @IsArray()
  position: string[] | string;
}
