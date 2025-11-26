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
  id: number;

  /**
   * 猫的名字
   */
  @Column()
  name: string;

  /**
   * 猫的年龄
   */
  @Column()
  age: number;

  /**
   * 猫的品种
   */
  @Column()
  breed: string;
}
