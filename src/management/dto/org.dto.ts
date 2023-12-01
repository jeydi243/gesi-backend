import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, ValidateIf, isDate, IsMongoId } from 'class-validator';

export default class OrganizationDto {
  @ApiProperty({ description: 'Name of the organization' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Code of the organization' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Lookup ID' })
  @IsString()
  lookup_id: string;

  @ApiProperty({ description: 'Description of the organization' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date of desactivation' })
  // @ValidateIf((obj, value) => isDate(new Date(value)))
  end_date: Date | null;

  @ApiProperty({ description: 'Date of creation' })
  @Transform(({}) => new Date(), {})
  created?: Date | null;

  @ValidateIf((obj, value) => isDate(new Date(value)))
  @ApiProperty({ description: 'ID of experience' })
  @IsString()
  organization_parent_id: string | null;

  @ApiProperty({ description: 'ID of creator' })
  @IsMongoId()
  createdBy: string;
}
