import { PartialType } from '@nestjs/swagger';
import { DocumentOrganisationDTO } from './document.dto';

export class UpdateDocumentDTO extends PartialType(DocumentOrganisationDTO) {}
