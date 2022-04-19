import { PartialType } from '@nestjs/mapped-types';
import { DocumentOrgDTO } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(DocumentOrgDTO) {}
