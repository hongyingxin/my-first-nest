import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Dog } from './entities/dog.entity';

/**
 * DogsModule - 狗模块
 *
 * TypeOrmModule.forFeature([Dog]) 的作用：
 * 1. 告诉 TypeORM 这个模块使用 Dog 实体
 * 2. 自动在数据库中创建 dogs 表（如果 synchronize: true）
 * 3. 让这个模块可以注入 Dog 的 Repository（数据仓库）
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Dog]), // 注册 Dog 实体
  ],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
