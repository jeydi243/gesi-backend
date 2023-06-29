import { ApiProperty } from '@nestjs/swagger';
import { IsString, Allow, IsMongoId } from 'class-validator';

export default class ClasseDTO {
  @Allow()
  @ApiProperty({ description: 'ID of Classe' })
  id?: string;

  @ApiProperty({ description: 'Code of Classe' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Name of Classe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of Classe' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Parent of Classe' })
  @IsString()
  parent_classe_id?: string;

  @ApiProperty({ description: 'Created by' })
  @IsMongoId()
  createdBy?: string;
}
