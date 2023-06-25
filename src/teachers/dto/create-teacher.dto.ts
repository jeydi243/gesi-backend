import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { PersonDTO } from '../../config/person.base';

export class CreateTeacherDTO extends PersonDTO {
  @MinLength(300, { message: 'Le message de description doit contenir au minimum $value' })
  @IsString()
  @ApiProperty()
  resume: string;
}
