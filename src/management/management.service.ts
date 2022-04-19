import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentOrgDTO } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentOrg, DocumentOrgDocument } from './schemas/document.schema';

@Injectable()
export class ManagementService {
  constructor(@InjectModel(DocumentOrg.name) private documentOrgModel: Model<DocumentOrgDocument>) {}

  async addDocumentSpec(docDto: DocumentOrgDTO): Promise<DocumentOrg | void> {
    const createddocumentOrgModel = new this.documentOrgModel(docDto);
    return createddocumentOrgModel.save();
  }

  async findAllDocuments(): Promise<DocumentOrg[] | void> {
    return this.documentOrgModel.find({ deletedAt: null });
  }

  async softDelete(code: string): Promise<DocumentOrg | void> {
    return this.documentOrgModel.findByIdAndUpdate({ code }, { $set: { deletedAt: Date() } });
  }
  async remove(code: string): Promise<DocumentOrg | void> {
    return this.documentOrgModel.findOneAndRemove({ code });
  }
  async updateDocument(code: string, documentUpdate: UpdateDocumentDto): Promise<DocumentOrg | void> {
    return this.documentOrgModel.findOneAndUpdate({ code }, { $set: { ...documentUpdate } });
  }
}
