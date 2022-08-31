import { PartialType } from '@nestjs/mapped-types';
import { DocumentOrgDTO } from './document.dto';

export class UpdateDocumentDto extends PartialType(DocumentOrgDTO) {}
