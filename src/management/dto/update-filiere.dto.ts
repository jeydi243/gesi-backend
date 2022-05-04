import { PartialType } from '@nestjs/mapped-types';
import { FiliereDTO } from './create-filiere.dto';

export class UpdateFiliereDto extends PartialType(FiliereDTO) {}
