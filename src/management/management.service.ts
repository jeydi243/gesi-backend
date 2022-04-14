import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentOrgDTO } from './dto/docmuent.dto';
import { DocumentOrg, DocumentOrgDocument } from './schemas/document.schema';

@Injectable()
export class ManagementService {
  constructor(@InjectModel(DocumentOrg.name) private documentOrgModel: Model<DocumentOrgDocument>) {}

  async addDocumentSpec(docDto: DocumentOrgDTO): Promise<DocumentOrg | void> {
    const createddocumentOrgModel = new this.documentOrgModel(docDto);
    return createddocumentOrgModel.save();
  }
  async findAll(): Promise<DocumentOrg[] | void> {
    return this.documentOrgModel.find();
  }
}
