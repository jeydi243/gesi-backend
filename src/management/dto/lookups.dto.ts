import { ApiProperty } from '@nestjs/swagger';
import { IsString, Allow } from 'class-validator';

export default class LookupsDto {
  @Allow()
  @ApiProperty({ description: 'ID of Lookups' })
  id?: string;

  @ApiProperty({ description: 'Code of Lookups' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Name of Lookups' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Classe of Lookups' })
  @IsString()
  classe: string;

  @ApiProperty({ description: 'Description of Lookups' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Parent of lookups' })
  @IsString()
  parent_lookups_id: string;
}
