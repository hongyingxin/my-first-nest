import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { DogResponseDto } from './dto/response-dog.dto';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @ApiOperation({ summary: '创建新狗' })
  @Post()
  async create(@Body() createDogDto: CreateDogDto): Promise<DogResponseDto> {
    return this.dogsService.create(createDogDto);
  }

  @ApiOperation({ summary: '获取所有狗' })
  @ApiQuery({ name: 'breed', required: false, description: '按品种筛选' })
  @ApiResponse({ status: 200, description: '成功获取狗列表', type: [DogResponseDto] })
  @Get()
  async findAll(@Query('breed') breed?: string): Promise<DogResponseDto[]> {
    return this.dogsService.findAll(breed);
  }

  @ApiOperation({ summary: '根据ID获取狗' })
  @ApiParam({ name: 'id', description: '狗的ID' })
  @ApiResponse({ status: 200, description: '成功获取狗信息', type: DogResponseDto })
  @ApiResponse({ status: 404, description: '狗不存在' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DogResponseDto> {
    return this.dogsService.findOne(id);
  }

  @ApiOperation({ summary: '更新狗信息' })
  @ApiParam({ name: 'id', description: '狗的ID' })
  @ApiResponse({ status: 200, description: '成功更新狗信息' })
  @ApiResponse({ status: 404, description: '狗不存在' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<DogResponseDto> {
    return this.dogsService.update(id, updateDogDto);
  }

  @ApiOperation({ summary: '删除狗' })
  @ApiParam({ name: 'id', description: '狗的ID' })
  @ApiResponse({ status: 200, description: '成功删除狗' })
  @ApiResponse({ status: 404, description: '狗不存在' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.dogsService.remove(id);
  }
}
