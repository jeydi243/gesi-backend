import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Name } from 'src/export.type';
import { PersonDto } from '../../person.base';

export class EmployeeDto extends PersonDto {
  @ApiProperty({ type: String, description: "Le nom de l'employee", examples: ['Franck Kessler', 'Paul George'] })
  name: string | Name;

  // @ApiProperty()
  // resume_file: File | Blob;

  // @ApiProperty()
  // profile_img: File | Blob;

  @ApiProperty({ type: String, maxLength: 20, description: "Le nom de l'ecole/universite " })
  @MinLength(5)
  @MaxLength(30, {
    message: ({ value, property, object }) =>
      `${property} n'as que ${value.length} le nombre de caractere maximum est ${object}`,
  })
  school_name: string;

  // @ApiProperty()
  // school_diploma_file: File | Blob;

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
  @MinLength(5)
  @MaxLength(200, {
    message: ({ value, property, object }) =>
      `${property} n'as que ${value.length} le nombre de caractere maximum est ${JSON.stringify(object)}`,
  })
  @ApiProperty({ description: 'Lettre de motivation' })
  cover_letter: string;

  @MaxLength(30, { message: 'Le maximum  de caracteres permis est 30' })
  @ApiProperty({ description: "Domaine d'application", examples: ['Math', 'Technique'] })
  domain: string | string[];

  @MaxLength(300)
  @MinLength(3, {
    message: ({ value, property, object }) =>
      `${property} n'as que ${value.length} le nombre de caractere minimum est ${JSON.stringify(object)}`,
  })
  @ApiProperty({
    examples: ['Directeur Financier', 'Developpeur Web'],
    description: "Fonction qu'il exerce au sein de l'organisation",
  })
  fonction: string | string[];
}
