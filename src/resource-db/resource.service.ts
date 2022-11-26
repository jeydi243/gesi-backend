import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { PartialResourceDTO } from './resource.dto';
@Injectable()
export class ResourceService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }
  async upload(file: any, metadata?: object) {
    this.fileModel.uploadFile(file.path, { filename: file.originalname, contentType: file.mimetype, metadata }, true);
  }
  async find() {
    return await this.fileModel.find({});
  }

  async findInfo(id: string): Promise<PartialResourceDTO> {
    const result = await this.fileModel
      .findById(id)
      .catch(err => {
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      })
      .then(result => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}
