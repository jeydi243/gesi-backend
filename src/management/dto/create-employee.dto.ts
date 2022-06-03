import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { BaseMemberDto } from '../../member.base';

export class EmployeeDto extends BaseMemberDto {
  @MinLength(300, { message: 'Le message de description doit contenir au minimum $value' })
  @IsString()
  @ApiProperty()
  resume: string;

  @MaxLength(30)
  @ApiProperty()
  domainTag: string | string[];

  @MinLength(300)

  @ApiProperty()
  fonction: string | string[];
}
