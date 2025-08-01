import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('参数演示')
@Controller('demo')
export class ParamsDemoController {
  
  // ===== @Query 示例 =====
  
  @ApiOperation({ summary: '查询参数示例' })
  @ApiQuery({ name: 'name', required: false, description: '名称' })
  @ApiQuery({ name: 'age', required: false, description: '年龄' })
  @ApiQuery({ name: 'city', required: false, description: '城市' })
  @Get('query')
  queryDemo(
    @Query('name') name?: string,
    @Query('age') age?: string,
    @Query('city') city?: string,
  ) {
    return {
      message: '查询参数示例',
      params: {
        name: name || '未提供',
        age: age || '未提供',
        city: city || '未提供',
      },
      url: 'GET /demo/query?name=John&age=25&city=Beijing',
    };
  }

  // ===== @Param 示例 =====
  
  @ApiOperation({ summary: '路径参数示例' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @Get('param/:id')
  paramDemo(@Param('id') id: string) {
    return {
      message: '路径参数示例',
      userId: id,
      url: `GET /demo/param/${id}`,
    };
  }

  // ===== 多个路径参数 =====
  
  @ApiOperation({ summary: '多个路径参数' })
  @ApiParam({ name: 'category', description: '分类' })
  @ApiParam({ name: 'id', description: 'ID' })
  @Get('param/:category/:id')
  multipleParams(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return {
      message: '多个路径参数示例',
      category,
      id,
      url: `GET /demo/param/${category}/${id}`,
    };
  }

  // ===== 混合使用 =====
  
  @ApiOperation({ summary: '混合参数示例' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiQuery({ name: 'page', required: false, description: '页码' })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量' })
  @Get('mixed/:userId')
  mixedParams(
    @Param('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return {
      message: '混合参数示例',
      userId,
      page: page || '1',
      limit: limit || '10',
      url: `GET /demo/mixed/${userId}?page=${page || 1}&limit=${limit || 10}`,
    };
  }

  // ===== 获取所有查询参数 =====
  
  @ApiOperation({ summary: '获取所有查询参数' })
  @Get('all-query')
  allQueryParams(@Query() allParams: Record<string, any>) {
    return {
      message: '所有查询参数',
      params: allParams,
      count: Object.keys(allParams).length,
    };
  }

  // ===== 获取所有路径参数 =====
  
  @ApiOperation({ summary: '获取所有路径参数' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiParam({ name: 'action', description: '操作' })
  @Get('all-param/:id/:action')
  allPathParams(@Param() allParams: Record<string, any>) {
    return {
      message: '所有路径参数',
      params: allParams,
      count: Object.keys(allParams).length,
    };
  }
} 