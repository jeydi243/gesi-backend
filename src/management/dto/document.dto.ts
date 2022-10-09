import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class DocumentOrganisationDTO {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10, { message: 'Code must be longer than 6 characters' })
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 10 })
  code: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 50 })
  name: string;

  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(2)
  @ApiProperty({ type: String, minLength: 2, maxLength: 500, required: true })
  description: string;
}
