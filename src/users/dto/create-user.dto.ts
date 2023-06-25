import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';
import { UserRole } from 'src/config/export.type';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 4, maxLength: 20, type: String })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, minLength: 4, maxLength: 20, type: String })
  password: string;

  @ApiProperty({
    required: true,
    type: Array<UserRole>,
  })
  @IsNotEmpty()
  roles: string[];

  @Optional()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: String,
  })
  role_id: string;
}
