import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow, IsDate, IsString } from 'class-validator';

export default class ServiceRequestDTO {
  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  service_id: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  student_id: string;

  @ApiProperty({ type: Date, required: true })
  @IsDate()
  request_date: Date;

  @ApiProperty({ type: Date, required: true })
  @IsDate()
  completion_date: Date;

  @ApiProperty({ type: String, required: false })
  @IsString()
  request_status: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  priority: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  assigned_staff: string;
}
