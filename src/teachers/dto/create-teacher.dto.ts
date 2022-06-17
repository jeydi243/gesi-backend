import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { PersonDto } from '../../person.base';

export class CreateTeacherDto extends PersonDto {
  @MinLength(300, { message: 'Le message de description doit contenir au minimum $value' })
  @IsString()
  @ApiProperty()
  resume: string;
}
