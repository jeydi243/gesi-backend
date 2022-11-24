import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class ResourceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(10)
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsOptional()
  length: number;

  @ApiProperty()
  chunkSize: number;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  @IsOptional()
  md5: string;

  @ApiProperty()
  contentType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsMongoId()
  @ApiProperty()
  uploadedBy: string;
}

export class PartialResourceDTO extends PartialType(ResourceDTO) {}
