import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Content } from './schemas/content.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ContentsService {
  constructor(@InjectModel(Content.name) private contentModel: Model<Content>) {}
  async create(createContentDto: CreateContentDto) {
    const student = new this.contentModel(createContentDto);
    return student.save();
  }

  async addContentImage(contentID: string, resourceIDs: string | string[], setDefault = false): Promise<Record<string, any>> {
    let wasdefaulted = false;
    let message = '';
    try {
      let objList: any = Array.isArray(resourceIDs) ? resourceIDs : [resourceIDs];

      objList = objList.map(id => {
        return { id, default: false };
      });

      const resp = await this.contentModel.findOneAndUpdate({ id: contentID }, { $push: { images: { $each: [...objList] } } }).exec();
      if (!Array.isArray(resourceIDs) && setDefault && resp) {
        wasdefaulted = await this.setDefaultContentImage(contentID, resourceIDs);
      }
      if (!resp) message = `No content with ID ${contentID}`;
      if (resp.images.findIndex(el => el.id === resourceIDs) != -1) message = 'The image was added to content images';
      return { message, wasdefaulted };
    } catch (error) {
      console.log(error);
      return { ...error };
    }
  }

  async setDefaultContentImage(contentID: string, resourceID: string): Promise<boolean> {
    try {
      const resp1 = await this.contentModel.findOneAndUpdate({ id: contentID, images: { $elemMatch: { default: true } } }, { $set: { 'images.$.default': false } }).exec();
      const resp = await this.contentModel.findOneAndUpdate({ id: contentID, images: { $elemMatch: { id: resourceID } } }, { $set: { 'images.$.default': true } }).exec();
      const id_old_default = resp1.images.find(el => el['default'] === true)['id'];
      const id_new_default = resp.images.find(el => el['default'] === true)['id'];
      console.log({ id_old_default }, { id_new_default });

      return id_old_default != id_new_default;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }
  findByAuthor(author: Types.ObjectId) {
    return this.contentModel.find({ author: author });
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return this.contentModel.findOneAndUpdate({ id }, updateContentDto);
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
