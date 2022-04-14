import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ManagementController } from './management.controller';
import { ManagementService } from './management.service';
import { DocumentOrg, DocumentOrgSchema } from './schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DocumentOrg.name, schema: DocumentOrgSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ManagementController],
  providers: [ManagementService],
})
export class ManagementModule {}
