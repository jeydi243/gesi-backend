import { ApiProperty } from '@nestjs/swagger';

export default class ExperienceDto {
  @ApiProperty({ description: 'Description of your responsabilities' })
  description: string;

  @ApiProperty({ description: 'Name of company' })
  company: string;

  @ApiProperty({ description: 'Start date of your experience' })
  start: string;

  @ApiProperty({ description: 'End date of your experience' })
  end: string;
}
