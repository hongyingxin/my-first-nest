import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 业务逻辑异常
 * 用于处理业务规则违反、数据不一致等业务层面的错误
 * 
 * @example
 * throw new BusinessException('用户余额不足', HttpStatus.PAYMENT_REQUIRED);
 * throw new BusinessException('订单状态不允许修改');
 */
export class BusinessException extends HttpException {
  /**
   * 创建业务异常
   * @param message 错误消息
   * @param status HTTP状态码，默认为400
   */
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(
      {
        message,
        error: 'BUSINESS_ERROR',
        statusCode: status,
      },
      status
    );
  }
}

/**
 * 资源未找到异常
 * 用于处理请求的资源不存在的情况
 * 
 * @example
 * throw new ResourceNotFoundException('User', '123');
 * // 响应: { message: "User with ID 123 not found", error: "RESOURCE_NOT_FOUND", statusCode: 404 }
 */
export class ResourceNotFoundException extends HttpException {
  /**
   * 创建资源未找到异常
   * @param resource 资源名称（如：User、Cat、Order）
   * @param id 资源ID
   */
  constructor(resource: string, id: number) {
    super(
      {
        message: `${resource} with ID ${id} not found`,
        error: 'RESOURCE_NOT_FOUND',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND
    );
  }
}

/**
 * 资源已存在异常
 * 用于处理创建资源时发现资源已存在的情况
 * 
 * @example
 * throw new ResourceAlreadyExistsException('User', 'email', 'user@example.com');
 * // 响应: { message: "User with email 'user@example.com' already exists", error: "RESOURCE_ALREADY_EXISTS", statusCode: 409 }
 */
export class ResourceAlreadyExistsException extends HttpException {
  /**
   * 创建资源已存在异常
   * @param resource 资源名称（如：User、Cat、Order）
   * @param field 冲突字段（如：email、username、phone）
   * @param value 冲突字段的值
   */
  constructor(resource: string, field: string, value: string) {
    super(
      {
        message: `${resource} with ${field} '${value}' already exists`,
        error: 'RESOURCE_ALREADY_EXISTS',
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT
    );
  }
}
