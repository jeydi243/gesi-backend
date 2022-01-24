import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';

export class CreateUserDto {
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  name: string;
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  password: string;
  @ApiProperty({ required: true, minLength: 6, maxLength: 20, type: String })
  salt: string;
  @ApiProperty({
    required: true,
    minLength: 6,
    maxLength: 20,
    type: String,
    enum: UserRole,
  })
  role: string;
}
