import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dogs')
export class Dog {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '狗的唯一标识符',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '狗的名字',
    example: '旺财',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '狗的年龄',
    example: 3,
    minimum: 0,
  })
  age: number;

  @Column()
  @ApiProperty({
    description: '狗的品种',
    example: '柴犬',
  })
  breed: string;
}
