import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { BaseMemberDto } from '../../member.base';

export class CreateTeacherDto extends BaseMemberDto {
  @MinLength(300, { message: 'Le message de description doit contenir au minimum $value' })
  @IsString()
  @ApiProperty()
  resume: string;
}
