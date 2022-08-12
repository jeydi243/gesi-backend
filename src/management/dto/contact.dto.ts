import { ApiProperty } from '@nestjs/swagger';

export default class ContactDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  telephones: string;

  @ApiProperty()
  email: string;
}
