import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { ResourceDTO } from '../../resource-db/resource.dto';

export class Part {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  duration: Record<string, number>;

  resources: ResourceDTO[] | null;
}
