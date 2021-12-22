import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export type Name = { first: string; last: string; middle?: string };
export class CreateStudentDto {
  @ApiProperty({
    description: 'Name of the student',
    examples: [
      'Kadiongo Kazadi Jospin',
      { firstName: 'Kadiongo', lastName: 'Kazadi', middleName: 'Jospin' },
    ],
    required: true,
  })
  name: string | Name;

  @ApiProperty()
  gender: string;

  @IsEmail()
  @ApiProperty()
  personalEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  birthDate: string;
}
