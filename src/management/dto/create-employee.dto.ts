import { Optional } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { Name } from 'src/export.type';
import { PersonDto } from '../../person.base';

export class EmployeeDto extends PersonDto {
  @ApiProperty({ type: String })
  name: string | Name;

  @ApiProperty()
  resume_file: File | Blob;

  @ApiProperty()
  profile_img: File | Blob;

  @ApiProperty({ type: String, maxLength: 20 })
  school_name: string;

  @ApiProperty()
  school_diploma_file: File | Blob;

  @ApiProperty({ type: String, maxLength: 100 })
  school_diploma_name: string;

  @ApiProperty({ type: Date })
  @Transform(v => new Date(v.value))
  @ValidateIf(o => o.school_start_date < o.school_end_date)
  school_start_date: Date;

  @ApiProperty({ type: Date })
  @Transform(v => new Date(v.value))
  school_end_date: Date;

  @MinLength(300, { message: 'Le cover letter doit contenir au minimum $value' })
  @IsString()
  @ApiProperty()
  cover_letter: string;

  @MaxLength(30)
  @ApiProperty()
  domain: string | string[];

  @MinLength(300)
  @Optional()
  @ApiPropertyOptional()
  fonction: string | string[];
}
