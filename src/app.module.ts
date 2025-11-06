import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.SHORTCUT_DB_HOST || 'localhost',
        port: 5432,
        username: configService.get('SHORTCUT_DB_USER'),
        password: configService.get('SHORTCUT_DB_PASSWORD'),
        database: configService.get('SHORTCUT_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // TODO: Remove in production
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.SHORTCUT_REDIS_HOST || 'localhost',
      port: 6379,
    }),
    UrlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
