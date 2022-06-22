import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PersonSchema } from 'src/person.base';
import { StudentSchema } from './schemas/student.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsService } from './students.service';
import { ResponsableSchema } from './schemas/responsable.schema';
import { DocumentOrgSchema } from 'src/management/schemas/document.schema';
import { StudentsController } from './students.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "DocumentOrg", schema: DocumentOrgSchema },
      { name: "Responsable", schema: ResponsableSchema },
      {
        name: 'Person',
        schema: PersonSchema,
        discriminators: [
          { name: 'Student', schema: StudentSchema },
        ],
      },
    ]),

    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
