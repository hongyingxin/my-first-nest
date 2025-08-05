import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';


@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @ApiOperation({ summary: '创建新狗' })
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @ApiOperation({ summary: '获取所有狗' })
  @ApiQuery({ name: 'breed', required: false, description: '按品种筛选' })
  @ApiResponse({ status: 200, description: '成功获取狗列表', type: [Dog] })
  @Get()
  findAll(@Query('breed') breed?: string) {
    return this.dogsService.findAll(breed);
  }

  @ApiOperation({ summary: '根据ID获取狗' })
  @ApiParam({ name: 'id', description: '狗的ID' })
  @ApiResponse({ status: 200, description: '成功获取狗信息', type: Dog })
  @ApiResponse({ status: 404, description: '狗不存在' })
  @Get(':id')
  findOne(@Param('id') id: string): Dog {
    return this.dogsService.findOne(id);
  }

  @ApiOperation({ summary: '更新狗信息' })
  @ApiParam({ name: 'id', description: '狗的ID' })
  @ApiResponse({ status: 200, description: '成功更新狗信息' })
  @ApiResponse({ status: 404, description: '狗不存在' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @ApiOperation({ summary: '删除狗' })
  @ApiParam({ name: 'id', description: '狗的ID' })
  @ApiResponse({ status: 200, description: '成功删除狗' })
  @ApiResponse({ status: 404, description: '狗不存在' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(id);
  }
}
