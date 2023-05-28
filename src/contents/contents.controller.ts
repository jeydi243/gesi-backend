import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Types } from 'mongoose';
import { ApiConsumes } from '@nestjs/swagger';
import { ResourceService } from 'src/resource/resource.service';
import { FilesInterceptor } from '@nestjs/platform-express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//require('dotenv').config();

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService, private readonly resourceService: ResourceService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Post('/:contentID/content_image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async addContentImage(@UploadedFiles() images: Array<Express.Multer.File>, @Param('contentID') contentID: string, @Body('setDefault') setDefault: boolean) {
    try {
      console.log('Change default image for content id %s', contentID);
      console.log({ images });
      const imagesID: string[] = images.map(el => el.id);
      const response: Record<string, any> = await this.contentsService.addContentImage(contentID, imagesID, setDefault);
      return response;
    } catch (error) {
      console.log(error);
      return { ...error };
    }
  }

  @Patch('/:contentID/set_default')
  async setDefaultContentImage(@Param('contentID') contentID: string, @Query() query: Record<string, string>) {
    try {
      const tr = await this.contentsService.setDefaultContentImage(contentID, query.resourceID);
      return tr;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Get()
  async findAll() {
    return this.contentsService
      .findAll()
      .then(contents => contents)
      .catch(err => err);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(+id);
  }

  @Get('byauthor/:idauthor')
  findByAuthor(@Param('author') author: Types.ObjectId) {
    return this.contentsService.findByAuthor(author);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(+id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(+id);
  }
}
