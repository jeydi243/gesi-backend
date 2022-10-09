import { PartialType } from '@nestjs/mapped-types';
import { DocumentOrganisationDTO } from './document.dto';

export class UpdateDocumentDto extends PartialType(DocumentOrganisationDTO) {}
