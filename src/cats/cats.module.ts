import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

/**
 * CatsModule - 猫模块
 *
 * TypeOrmModule.forFeature([Cat]) 的作用：
 * 1. 告诉 TypeORM 这个模块使用 Cat 实体
 * 2. 自动在数据库中创建 cats 表（如果 synchronize: true）
 * 3. 让这个模块可以注入 Cat 的 Repository（数据仓库）
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]), // 注册 Cat 实体
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
