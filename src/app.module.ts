import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { getDatabaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';

/**
 * AppModule - 应用根模块
 */
@Module({
  imports: [
    // 加载环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 使用配置函数，而不是硬编码配置
    TypeOrmModule.forRoot(getDatabaseConfig()),
    CatsModule,
    DogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
