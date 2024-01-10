import { PartialType } from '@nestjs/mapped-types';
import { PositionDTO } from './position.dto';

export class UpdatePositionDto extends PartialType(PositionDTO) {}
