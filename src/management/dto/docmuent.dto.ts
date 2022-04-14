import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class DocumentOrgDTO {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 20 })
  code: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 20 })
  name: string;
}
