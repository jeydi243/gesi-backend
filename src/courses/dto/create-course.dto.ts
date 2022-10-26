import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  images: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  parts: [];

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  createdBy: string;
}
