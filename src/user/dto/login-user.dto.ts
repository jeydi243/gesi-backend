import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    type: String,
    description: 'Username fournit par votre administrateur',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  password: string;
}
