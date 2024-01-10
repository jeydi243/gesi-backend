import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, ValidateIf, isMongoId } from 'class-validator';
export class PositionDTO {

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @ValidateIf((o, value) => (value ? isMongoId(value) : false))
  org_id: string;

  @ApiProperty()
  @IsString()
  job_description: string;

  @ApiProperty()
  @IsString()
  report_to: string;

  @ApiProperty()
  @ValidateIf((o, value) => (value ? isMongoId(value) : false))
  employment_type: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  endDate: Date;

  @ApiProperty()
  @IsMongoId()
  createdBy: string;
}
