import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ResourceNotFoundException } from '../exceptions';
import { Cat } from './entities/cat.entity';

/**
 * CatsService - 猫服务类
 * 使用 TypeORM Repository 模式操作数据库
 */
@Injectable()
export class CatsService {
  /**
   * 构造函数 - 依赖注入
   *
   * @InjectRepository(Cat) - 这是 NestJS 的依赖注入装饰器
   * 作用：告诉 NestJS 注入 Cat 实体的 Repository
   *
   * Repository<Cat> - TypeORM 的数据仓库
   * 提供了常用的数据库操作方法：find, findOne, save, remove 等
   */
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  /**
   * 查询所有猫
   * @param breed - 可选的品种筛选参数
   * @returns Promise<Cat[]> - 返回猫的数组（异步操作）
   *
   * Repository.find() 方法：
   * - 无参数：查询所有记录
   * - 有 where 条件：按条件查询
   */
  async findAll(breed?: string): Promise<Cat[]> {
    if (breed) {
      // 按品种筛选：SELECT * FROM cats WHERE breed = ?
      return this.catRepository.find({ where: { breed } });
    }
    // 查询所有：SELECT * FROM cats
    return this.catRepository.find();
  }

  /**
   * 根据 ID 查询单个猫
   * @param id - 猫的 ID
   * @returns Promise<Cat> - 返回找到的猫
   * @throws ResourceNotFoundException - 如果猫不存在
   *
   * Repository.findOne() 方法：
   * - 查询单条记录：SELECT * FROM cats WHERE id = ? LIMIT 1
   * - 如果找不到返回 null
   */
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) {
      throw new ResourceNotFoundException('Cat', id);
    }
    return cat;
  }

  /**
   * 创建新猫
   * @param createCatDto - 创建猫的数据传输对象
   * @returns Promise<Cat> - 返回创建的猫（包含自动生成的 ID）
   *
   * 两步操作：
   * 1. create() - 创建实体对象（仅在内存中，未保存到数据库）
   * 2. save() - 保存到数据库：INSERT INTO cats (...) VALUES (...)
   */
  async create(createCatDto: CreateCatDto): Promise<Cat> {
    console.log('createCatDto', createCatDto);
    const newCat = this.catRepository.create(createCatDto);
    console.log('newCat', newCat);
    return this.catRepository.save(newCat);
  }

  /**
   * 更新猫的信息
   * @param id - 猫的 ID
   * @param updateCatDto - 更新的数据
   * @returns Promise<Cat> - 返回更新后的猫
   * @throws ResourceNotFoundException - 如果猫不存在
   *
   * 步骤：
   * 1. 先查询是否存在（复用 findOne 方法）
   * 2. Object.assign() - 将更新的属性合并到现有对象
   * 3. save() - 保存更新：UPDATE cats SET ... WHERE id = ?
   */
  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.findOne(id);
    Object.assign(cat, updateCatDto);
    return this.catRepository.save(cat);
  }

  /**
   * 删除猫
   * @param id - 猫的 ID
   * @returns Promise<{ message: string }> - 返回删除成功消息
   * @throws ResourceNotFoundException - 如果猫不存在
   *
   * 步骤：
   * 1. 先查询是否存在（复用 findOne 方法）
   * 2. remove() - 删除记录：DELETE FROM cats WHERE id = ?
   */
  async remove(id: number): Promise<{ message: string }> {
    const cat = await this.findOne(id);
    await this.catRepository.remove(cat);
    return { message: `Cat with ID ${id} has been removed` };
  }
}
