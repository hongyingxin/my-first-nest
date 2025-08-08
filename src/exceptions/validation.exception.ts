import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 验证异常
 * 用于处理数据验证失败的情况，如请求参数验证、业务规则验证等
 * 
 * @example
 * throw new ValidationException('请求参数验证失败', ['name is required', 'age must be positive']);
 * // 响应: { message: "请求参数验证失败", error: "VALIDATION_ERROR", statusCode: 400, details: [...] }
 */
export class ValidationException extends HttpException {
  /**
   * 创建验证异常
   * @param message 错误消息
   * @param errors 详细的验证错误列表（可选）
   */
  constructor(message: string, errors?: string[]) {
    super(
      {
        message,
        error: 'VALIDATION_ERROR',
        statusCode: HttpStatus.BAD_REQUEST,
        details: errors,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

/**
 * 无效输入异常
 * 用于处理特定字段输入无效的情况
 * 
 * @example
 * throw new InvalidInputException('email', '格式不正确');
 * // 响应: { message: "Invalid input for field 'email': 格式不正确", error: "INVALID_INPUT", statusCode: 400, field: "email", reason: "格式不正确" }
 */
export class InvalidInputException extends HttpException {
  /**
   * 创建无效输入异常
   * @param field 无效字段名
   * @param reason 无效原因
   */
  constructor(field: string, reason: string) {
    super(
      {
        message: `Invalid input for field '${field}': ${reason}`,
        error: 'INVALID_INPUT',
        statusCode: HttpStatus.BAD_REQUEST,
        field,
        reason,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
