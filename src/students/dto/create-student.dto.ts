import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export type Name = { first: string; last?: string; middle?: string };
export class CreateStudentDto {
  listLevel: Array<string> = [
    'Prépa',
    'Bac',
    'Bac+1',
    'Bac+2',
    'Bac+3',
    'Bac+4',
    'Bac+5',
    'Bac+6',
  ];
  listState: Array<string> = [
    'Candidat',
    'Etudiant',
    'Diplomé',
    'Abandon',
    'Renvoi',
  ];

  @MaxLength(25, {
    message: '$value est trop long',
  })
  @MinLength(6, { message: '$value est trop court' })
  @ApiProperty({
    description: "Nom de l'etudiant sous la forme 'last middle first'",
    examples: [
      'Kadiongo Kazadi Jospin',
      { firstName: 'Kadiongo', lastName: 'Kazadi', middleName: 'Jospin' },
    ],
    required: true,
  })
  name: string | Name;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Le genre M ou F',
    maximum: 1,
  })
  gender: string;

  @IsEmail()
  @ApiProperty({ description: "Email personnel fournis par l'etudiant " })
  personalEmail: string;

  @IsEmail()
  @ApiProperty({ description: "Email fournis par l'institution" })
  email: string;

  @ApiProperty({
    description: 'Peut contenir un ou plusieurs numéro de téléphone',
    example: ['+243897949336', '+22500000001'],
    isArray: true,
    minItems: 1,
    maxItems: 5,
  })
  telephone: number[] | string[];

  @ApiProperty({
    description: "Date de naissance de l'étudiant",
    required: true,
  })
  birthDate: Date;

  @ApiProperty({
    description: "Le statut actuel de l'etudiant",
    example: 'Diplomé',
    default: 'Candidat',
    required: true,
    type: String,
  })
  statut: string;

  @ApiProperty({
    description: "Le niveau actuel de l'etudiant",
    example: 'G2',
    default: 'G3',
    nullable: false,
    required: true,
  })
  level: string;

  @ApiProperty({
    description:
      'Les informations concernant une ou plusieurs personne référente',
    type: Array,
  })
  responsables: Map<string, any>[];

  @ApiProperty({
    type: Map,
    description:
      "L'établissement secondaire ou le diplome secondaire a été obtenue",
    example: 'Ecole Maadini',
    required: true,
  })
  highSchool: Map<string, any>;
}
