import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log('process.env', process.env.DB_TYPE);

/**
 * 数据库配置函数
 * 从环境变量中读取数据库配置
 */
export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: process.env.DB_TYPE as 'mysql', // 数据库类型
  host: process.env.DB_HOST, // 数据库地址
  port: parseInt(process.env.DB_PORT || '3306', 10), // 数据库端口
  username: process.env.DB_USERNAME, // 数据库用户名
  password: process.env.DB_PASSWORD, // 数据库密码
  database: process.env.DB_DATABASE, // 数据库名称
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 实体文件
  synchronize: process.env.NODE_ENV !== 'production', // 生产环境自动设为 false
  logging: process.env.NODE_ENV === 'development', // 仅开发环境显示 SQL 日志
});
