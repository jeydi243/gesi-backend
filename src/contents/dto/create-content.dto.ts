import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsMongoId, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @ArrayNotEmpty()
  authors: string[];

  @ApiProperty()
  @IsArray()
  images: string[];

  @ApiProperty()
  price: Record<string, string>;

  @ApiProperty()
  @IsArray()
  parts: [];

  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId({ message: args => `${args.value} is not valid ${args.property}` })
  createdBy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expiredate: string;
}
