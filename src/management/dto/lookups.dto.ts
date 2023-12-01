import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, ValidateIf, isMongoId } from 'class-validator';

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
  @IsString()
  classe_id: string;

  @ApiProperty()
  @ValidateIf((o,value)=> value ? isMongoId(value) : false)
  parent_lookup_id?: string | null;

  @ApiProperty()
  @IsMongoId()
  createdBy?: string;
}
