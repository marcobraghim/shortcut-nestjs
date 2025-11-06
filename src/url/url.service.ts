import { Injectable, Inject } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlEntity } from './entities/url.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { RedisClientType } from 'redis';
import { toBase62 } from 'src/utils/functions';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly repository: Repository<UrlEntity>,
    @Inject('REDIS_CLIENT')
    private readonly redisClient: RedisClientType
  ) { }



  async create(createUrlDto: CreateUrlDto) {
    const url = this.repository.create(createUrlDto);

    // Get the next shortcode from the Redis INCR Counter
    // Initialize counter at 14 million if it doesn't exist
    // just to make the first shortcodes not be shorter than 4 chars
    const exists = await this.redisClient.exists('url:counter');
    if (!exists) {
      await this.redisClient.set('url:counter', 13999999);
    }

    const counter = await this.redisClient.incr('url:counter');
    console.log('counter', counter);

    // Convert the counter to base 62 hashid
    url.shortcode = toBase62(counter);

    return this.repository.save(url);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(shortcode: string) {
    return this.repository.findOneBy({ shortcode });
  }

  async update(shortcode: string, updateUrlDto: UpdateUrlDto) {
    const url = await this.repository.findOneBy({ shortcode });
    if (url) {
      this.repository.merge(url, updateUrlDto);
      return this.repository.save(url);
    }
    return null;
  }

  async remove(shortcode: string) {
    const url = await this.repository.findOneBy({ shortcode });
    if (url) {
      return this.repository.remove(url);
    }
    return null;
  }
}
