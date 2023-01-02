import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsString, Allow } from 'class-validator';

export default class ExperienceDto {
  @Allow()
  @ApiProperty({ description: 'ID of experience' })
  id?: string;

  @ApiProperty({ description: 'Description of your responsabilities' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Name of company' })
  @IsString()
  company: string;

  @ApiProperty({ description: 'Name of company' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'Start date of your experience' })
  @Transform(v => new Date(v.value))
  @IsDate()
  start: string;

  @ApiProperty({ description: 'End date of your experience' })
  @Transform(v => new Date(v.value))
  @IsDate()
  end: string;
}
