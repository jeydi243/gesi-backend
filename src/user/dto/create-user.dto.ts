import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserRole } from './user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  password: string;

  @Optional()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  salt: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    type: String,
    enum: UserRole,
  })
  role: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
  })
  roleUserID: string;
}
