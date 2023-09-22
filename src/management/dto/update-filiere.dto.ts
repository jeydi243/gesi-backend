import { PartialType } from '@nestjs/swagger';
import { FiliereDTO } from './create-filiere.dto';

export class UpdateFiliereDTO extends PartialType(FiliereDTO) {}
