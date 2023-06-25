import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf, isDate, IsMongoId } from 'class-validator';

export default class OrganizationDto {
  @ApiProperty({ description: 'Name of the organization' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Code of the organization' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Description of the organization' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date of desactivation' })
  date_desactivation: Date | null;

  @ApiProperty({ description: 'Date of creation' })
  @ValidateIf((obj, value) => isDate(new Date(value)))
  date_creation: Date;

  @ValidateIf((obj, value) => isDate(new Date(value)))
  @ApiProperty({ description: 'ID of experience' })
  @IsString()
  organization_parent_id: string | null;

  @ApiProperty({ description: 'ID of creator' })
  @IsMongoId()
  createdBy: string;
}
