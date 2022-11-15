
import { Module } from '@nestjs/common';
// import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './storage';
import { ResourceService } from './resource.service'

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
    ],
    // controllers: [FilesController],
    providers: [GridFsMulterConfigService, ResourceService],
})
export class FilesModule {}