import { PartialType } from '@nestjs/mapped-types';
import { FiliereDTO } from './create-filiere.dto';

export class UpdateFiliereDTO extends PartialType(FiliereDTO) {}
