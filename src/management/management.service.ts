import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentOrg, DocumentOrgDocument } from './schemas/document.schema';

@Injectable()
export class ManagementService {
  constructor(@InjectModel(DocumentOrg.name) private documentOrgModel: Model<DocumentOrgDocument>) {}
}
