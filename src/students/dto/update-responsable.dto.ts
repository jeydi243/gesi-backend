import { PartialType } from '@nestjs/swagger';
import { CreateResponsableDTO } from './create-responsable.dto';

export class UpdateResponsableDTO extends PartialType(CreateResponsableDTO) {}
