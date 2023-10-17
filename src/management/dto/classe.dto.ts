import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClasseDTO {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}
