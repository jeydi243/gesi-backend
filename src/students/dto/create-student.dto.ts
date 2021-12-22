import { ApiProperty } from '@nestjs/swagger';
type Name = { [key: string]: string };
export class CreateStudentDto {
  @ApiProperty({
    description: 'Name of the student',
    examples: [
      'Kadiongo Ilunga Epaphrodite or ',
      { firstName: 'Kadiongo', lastName: 'Ilunga', middleName: 'Epaphrodite' },
    ],
    required: true,
  })
  name: string | Name;

  @ApiProperty()
  age: number;

  @ApiProperty()
  birthDate: string;
}
