import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsMongoId, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateContentDTO {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ default: 'course' })
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @ArrayNotEmpty()
  authors: string[];

  @ApiProperty()
  @IsArray()
  images: string[];

  @ApiProperty()
  @IsNotEmpty()
  price: Record<string, string>;

  @ApiProperty()
  @IsArray()
  parts: [];

  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  //@IsMongoId({ message: args => `${args.value} is not valid ${args.property}` })
  createdBy: string;

  @ApiProperty()
  //@IsNotEmpty({})
  //@IsMongoId({ message: args => `${args.value} is not valid ${args.property}` })
  updatedBy: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expiredate: string;
}
