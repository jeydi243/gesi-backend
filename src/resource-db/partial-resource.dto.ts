import { PartialType } from '@nestjs/swagger';
import { ResourceDTO } from './resource.dto';

export class PartialResource extends PartialType(ResourceDTO) {}