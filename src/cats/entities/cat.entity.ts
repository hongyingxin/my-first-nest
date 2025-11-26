import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Cat 实体类
 * @Entity('cats') - 表示这个类对应数据库中的 'cats' 表
 */
@Entity('cats')
export class Cat {
  /**
   * 主键列，自动递增
   */
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '猫的唯一标识符',
    example: 1,
  })
  id: number;

  /**
   * 猫的名字
   */
  @Column()
  @ApiProperty({
    description: '猫的名字',
    example: 'Whiskers',
  })
  name: string;

  /**
   * 猫的年龄
   */
  @Column()
  @ApiProperty({
    description: '猫的年龄',
    example: 3,
    minimum: 0,
  })
  age: number;

  /**
   * 猫的品种
   */
  @Column()
  @ApiProperty({
    description: '猫的品种',
    example: 'Persian',
  })
  breed: string;
}
