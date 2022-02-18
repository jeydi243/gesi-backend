import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Genre, ListLevel, Name } from 'src/export.type';

export class CreateStudentDto {
  @MaxLength(25, {
    message: '$value est trop long',
  })
  @MinLength(6, { message: '$value est trop court' })
  @ApiProperty({
    description: "Nom de l'étudiant sous la forme 'last middle first'",
    examples: ['Kadiongo Kazadi Jospin', { firstName: 'Kadiongo', lastName: 'Kazadi', middleName: 'Jospin' }],
    required: true,
  })
  @IsNotEmpty()
  name: string | Name;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    enum: Genre,
    description: 'Le genre M ou F',
    maximum: 1,
  })
  gender: string;

  @IsEmail()
  @ApiProperty({ description: "Email personnel fournis par l'etudiant " })
  personalEmail: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Nationalité ' })
  cityzenship: string;

  @IsEmail()
  @ApiProperty({ description: "Email fournis par l'institution" })
  email: string;

  @ApiProperty({
    description: 'Peut contenir un ou plusieurs numéro de téléphone',
    example: ['+243897949336', '+22500000001'],
    isArray: true,
    minItems: 1,
    maxItems: 5,
    required: true,
  })
  @IsNotEmpty()
  telephone: string[];

  @ApiProperty({
    description: "Date de naissance de l'étudiant",
    required: true,
  })
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    description: "Le statut actuel de l'étudiant",
    example: 'Diplomé',
    default: 'Candidat',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  statut: string;

  @ApiProperty({
    description: "Le niveau actuel de l'étudiant",
    default: 'G3',
    enum: ListLevel,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'Les informations concernant une ou plusieurs personne référente',
    type: Array,
  })
  responsables: Map<string, any>[];

  @ApiProperty({
    type: Map,
    description: "L'établissement secondaire ou le diplome secondaire a été obtenue",
    example: 'Ecole Maadini',
    required: true,
  })
  highSchool: Map<string, any>;
}
