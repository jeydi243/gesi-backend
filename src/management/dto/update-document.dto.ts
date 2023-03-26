import { PartialType } from '@nestjs/mapped-types';
import { DocumentOrganizationDTO } from './document.dto';

export class UpdateDocumentDto extends PartialType(DocumentOrganizationDTO) {}
