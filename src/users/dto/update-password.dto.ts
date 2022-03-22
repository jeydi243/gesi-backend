import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  newPassword: string;
}
