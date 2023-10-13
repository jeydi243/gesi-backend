import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateResponsableDto {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 20 })
  name: string;

  @MinLength(10, { each: true })
  @MaxLength(10, { each: true })
  @ApiProperty({
    type: [String],
    required: true,
    minLength: 10,
    maxLength: 10,
    description: "List au minimum d'un numéro de telephone",
    example: ['0612345678', '0612345678'],
  })
  telephones: string[];

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;
}
