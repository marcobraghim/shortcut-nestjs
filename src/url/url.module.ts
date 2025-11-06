import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlEntity } from './entities/url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from 'redis';

@Module({
  imports: [TypeOrmModule.forFeature([
    UrlEntity
  ])],
  controllers: [UrlController],
  providers: [
    UrlService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: process.env.SHORTCUT_REDIS_HOST || 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class UrlModule {}
