import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':shortcode')
  async findOne(@Param('shortcode') shortcode: string) {
    const url = await this.urlService.findOne(shortcode);
    if (!url) {
      throw new NotFoundException();
    }
    return url;
  }

  @Patch(':shortcode')
  update(@Param('shortcode') shortcode: string, @Body() updateUrlDto: UpdateUrlDto) {
    const url = this.urlService.update(shortcode, updateUrlDto);
    if (!url) {
      throw new NotFoundException();
    }
    return url;
  }

  @Delete(':shortcode')
  @HttpCode(204)
  async remove(@Param('shortcode') shortcode: string) {
    const url = await this.urlService.remove(shortcode);
    if (!url) {
      throw new NotFoundException();
    }
  }
}
