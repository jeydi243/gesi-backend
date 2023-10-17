import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsDate, IsObject, IsString, Validate } from 'class-validator';

export default class StudentServiceDTO {
  @ApiProperty({ required: false, type: String })
  @Allow()
  id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  code: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  description: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  website: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  availability: string;

  @ApiProperty({ type: Map<string, string>, required: true })
  @IsObject()
  contact: Record<string, string>;
}
