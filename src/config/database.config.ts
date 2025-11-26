import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cat } from '../cats/entities/cat.entity';
import { Dog } from '../dogs/entities/dog.entity';

/**
 * 数据库配置函数
 * 从环境变量中读取数据库配置
 */
export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: (process.env.DB_TYPE as 'mysql') || 'mysql', // 数据库类型
  host: process.env.DB_HOST || 'localhost', // 数据库地址
  port: parseInt(process.env.DB_PORT || '3306', 10), // 数据库端口
  username: process.env.DB_USERNAME || 'root', // 数据库用户名
  password: process.env.DB_PASSWORD || '123456789', // 数据库密码
  database: process.env.DB_DATABASE || 'my-first-nest', // 数据库名称

  /**
   * 实体类配置 - 两种方式：
   *
   * 方式一（推荐）：使用通配符自动扫描
   * entities: [__dirname + '/../**\/*.entity{.ts,.js}']
   * - 优点：自动扫描，添加新实体不需要修改配置
   *
   * 方式二（当前）：显式导入所有实体
   * entities: [Cat, Dog]
   * - 优点：明确知道有哪些实体，类型安全
   * - 缺点：每次添加新实体需要手动导入
   */
  entities: [Cat, Dog], // 显式列出所有实体类

  synchronize: process.env.NODE_ENV !== 'production', // 生产环境自动设为 false
  logging: process.env.NODE_ENV === 'development', // 仅开发环境显示 SQL 日志
});
