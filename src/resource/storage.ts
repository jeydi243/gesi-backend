import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;
  constructor() {
    console.log('Initialise GridFsMulterConfigService ... %s', process.env.NODE_ENV);
    this.gridFsStorage = new GridFsStorage({
      url: process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
      file: function (req, file) {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
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

export const mystorage = new GridFsStorage({
  url: process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
  file: (req, file) => {
    console.log('BANDUKU POURQUOI CELUI-CI MARCHE... in NODE_ENV');

    return new Promise(resolve => {
      const filename = file.originalname.trim();
      const fileInfo = {
        filename: filename,
        // id: 'jeydi',
      };
      resolve(fileInfo);
    });
  },
  options: {},
});
