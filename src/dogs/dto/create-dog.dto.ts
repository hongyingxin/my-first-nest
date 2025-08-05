import { ApiProperty } from "@nestjs/swagger";
export class CreateDogDto {
  @ApiProperty({
    description: '狗的名字',
    example: '旺财',
  })
  name: string;

  @ApiProperty({
    description: '狗的年龄',
    example: 3,
    minimum: 0,
  })
  age: number;

  @ApiProperty({
    description: '狗的品种',
    example: '柴犬',
  })
  breed: string;
}
