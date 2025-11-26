import { Controller, Get, Post, Put, Delete, Body, Param, Query, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatResponseDto } from './dto/response-cat.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@ApiTags('cats')
@UsePipes(new ValidationPipe())
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: '获取所有猫' })
  @ApiQuery({ name: 'breed', required: false, description: '按品种筛选' })
  @ApiResponse({ status: 200, description: '成功获取猫列表', type: [CatResponseDto] })
  @Get()
  async findAll(@Query('breed') breed?: string): Promise<CatResponseDto[]> {
    return this.catsService.findAll(breed);
  }

  @ApiOperation({ summary: '根据ID获取猫' })
  @ApiParam({ name: 'id', description: '猫的ID' })
  @ApiResponse({ status: 200, description: '成功获取猫信息', type: CatResponseDto })
  @ApiResponse({ status: 404, description: '猫不存在' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CatResponseDto> {
    return this.catsService.findOne(id);
  }

  @ApiOperation({ summary: '创建新猫' })
  @ApiResponse({ status: 201, description: '成功创建猫', type: CatResponseDto })
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<CatResponseDto> {
    return this.catsService.create(createCatDto);
  }

  @ApiOperation({ summary: '更新猫信息' })
  @ApiParam({ name: 'id', description: '猫的ID' })
  @ApiResponse({ status: 200, description: '成功更新猫信息' })
  @ApiResponse({ status: 404, description: '猫不存在' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<CatResponseDto> {
    return this.catsService.update(id, updateCatDto);
  }

  @ApiOperation({ summary: '删除猫' })
  @ApiParam({ name: 'id', description: '猫的ID' })
  @ApiResponse({ status: 200, description: '成功删除猫' })
  @ApiResponse({ status: 404, description: '猫不存在' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.catsService.remove(id);
  }
}
