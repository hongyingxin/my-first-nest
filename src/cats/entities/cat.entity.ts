import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({
    description: '猫的唯一标识符',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: '猫的名字',
    example: 'Whiskers',
  })
  name: string;

  @ApiProperty({
    description: '猫的年龄',
    example: 3,
    minimum: 0,
  })
  age: number;

  @ApiProperty({
    description: '猫的品种',
    example: 'Persian',
  })
  breed: string;
} 