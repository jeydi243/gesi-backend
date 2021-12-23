import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export type Name = { first: string; last: string; middle?: string };
export class CreateStudentDto {
  @MaxLength(25, {
    message: '$value est trop long',
  })
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
  })
  telephone: number[] | string[] | string;

  @ApiProperty()
  birthDate: Date;
}
