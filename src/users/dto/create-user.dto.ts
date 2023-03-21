import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { UserRole } from 'src/config/export.type';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  password: string;

  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    type: String,
    enum: UserRole,
  })
  @IsNotEmpty()
  role: string;

  @Optional()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
  })
  idOfRole: string;
}
