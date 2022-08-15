import { ApiProperty } from '@nestjs/swagger';

export default class ContactDto {
  @ApiProperty({ required: false, type: String })
  // @IsString()
  // @Optional()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  telephones: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  relationship: string;
}
