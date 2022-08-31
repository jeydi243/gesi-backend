import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsDate, IsString } from 'class-validator';

export default class EducationDTO {
  @ApiProperty({ required: false, type: String })
  // @IsString()
  // @Optional()
  @Allow()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  from_school: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: Date, required: true })
  @Transform(v => new Date(v.value))
  @IsDate()
  start: string;

  @ApiProperty({ type: Date, required: true })
  @Transform(v => new Date(v.value))
  @IsDate()
  end: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @Optional()
  description: string;
}
