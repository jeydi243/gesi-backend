import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;
  constructor() {
    console.log('Initialise GridFsMulterConfigService ... NODE_ENV = %s \n MONGO_URI_DEV = %s \nMONGO_ATLAS_URI = %s', process.env.NODE_ENV,process.env.MONGO_URI_DEV,process.env.MONGO_ATLAS_URI);
    this.gridFsStorage = new GridFsStorage({
      url: process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_ATLAS_URI,
      file: function (req, file) {
        console.log("Cette fonction s'execute pour chaque fichier");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
            epa: 'epa',
          };
          resolve(fileInfo);
        });
      },
    });
    // console.log(this.gridFsStorage);
  }

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
