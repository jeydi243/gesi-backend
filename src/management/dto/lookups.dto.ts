import { ApiProperty } from '@nestjs/swagger';
import { IsString, Allow, IsDate, IsMongoId } from 'class-validator';

export default class LookupsDTO {
  @Allow()
  @ApiProperty({ description: 'ID of Lookups' })
  id?: string;

  @ApiProperty({ description: 'Code of Lookups' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Name of Lookups' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Classe of Lookups', required: true })
  @IsString()
  classe_id?: string;

  @ApiProperty({ description: 'Description of Lookups' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Parent of lookups' })
  @IsString()
  parent_lookups_id?: string;

  @ApiProperty({ description: 'Created by' })
  @IsMongoId()
  createdBy?: string;
}
