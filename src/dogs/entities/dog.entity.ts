import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dogs')
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
