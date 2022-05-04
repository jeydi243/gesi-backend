import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Schema as S } from 'mongoose';

export class FiliereDTO {
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 20 })
  code: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({ type: String, required: true, minLength: 6, maxLength: 20 })
  name: string;

  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(20)
  @ApiProperty({ type: String, minLength: 20, maxLength: 500, required: true })
  description: string;

  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(20)
  @ApiProperty({ type: S.Types.ObjectId, required: true })
  manager: S.Types.ObjectId;

  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(20)
  @ApiProperty({ type: S.Types.ObjectId, minLength: 20, maxLength: 500, required: false })
  sub_manager: S.Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true })
  date_creation: Date;
}
