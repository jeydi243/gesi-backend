import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IGridFSObject, MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { PartialResourceDTO } from './resource.dto';
import { createModel } from 'mongoose-gridfs';

@Injectable()
export class ResourceService {
  private fileModel: MongoGridFS;
  private resourceModel: any;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
    this.resourceModel = createModel({
      modelName: 'fs',
      connection: connection,
    });
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }
  async upload(file: any, metadata?: object) {
    this.fileModel.uploadFile(file.path, { filename: file.originalname, contentType: file.mimetype, metadata }, true);
  }
  async find(): Promise<PartialResourceDTO[] | any> {
    const response = [];
    const res: any = await this.fileModel.find({});
    res.forEach((elg: IGridFSObject) => {
      response.unshift({ filename: elg.filename });
    });
    return response;
  }
  async findResourceInfo(id: string): Promise<PartialResourceDTO | null> {
    try {
      const result = await this.fileModel.findById(id);

      return {
        filename: result.filename,
        length: result.length,
        chunkSize: result.chunkSize,
        md5: result.md5,
        contentType: result.contentType,
      };
    } catch (error) {
      console.log(error.code);
      return error.message;
    }
  }

  async deleteResource(_id: string): Promise<boolean> {
    try {
      const found = await this.findResourceInfo(_id);
      if (found) return await this.resourceModel.unlink({ _id });
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }

    // return await this.fileModel.delete(id);
  }
}
