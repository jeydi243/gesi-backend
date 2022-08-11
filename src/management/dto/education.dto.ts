import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export default class EducationDTO {
  @ApiProperty()
  @Optional()
  id: string;

  @ApiProperty({ type: String, required: true })
  from_school: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String, required: true })
  start: string;

  @ApiProperty({ type: String, required: true })
  end: string;

  @ApiProperty({ type: String, required: true })
  @Optional()
  description: string;
}
