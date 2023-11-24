import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class LookupsDTO {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsMongoId()
  classe_id: string;

  @ApiProperty()
  @IsMongoId({always:false})
  parent_lookup_id?: string;

  @ApiProperty()
  @IsMongoId()
  createdBy?: string;
}
