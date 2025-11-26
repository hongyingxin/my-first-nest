import { ApiProperty } from '@nestjs/swagger';

export class DogResponseDto {
  @ApiProperty({
    description: '狗的唯一标识符',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '狗的名字',
    example: '旺财',
  })
  name: string;

  @ApiProperty({
    description: '狗的年龄',
    example: 3,
  })
  age: number;

  @ApiProperty({
    description: '狗的品种',
    example: '柴犬',
  })
  breed: string;
}
