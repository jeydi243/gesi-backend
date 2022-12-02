import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor() {
    console.log('LOKALISE MOI DES QUE TU PEUX 1');
    this.gridFsStorage = new GridFsStorage({
      url: process.env.NODE_ENV == 'development' ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD,
      file: function (req, file) {
        console.log('Mais mi chi youwé gridFsStorage ...in NODE_ENV');

        return null;
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
options:{}
});
