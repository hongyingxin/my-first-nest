import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * 认证异常
 * 用于处理用户身份验证失败的情况
 * 
 * @example
 * throw new AuthenticationException('用户名或密码错误');
 * // 响应: { message: "用户名或密码错误", error: "AUTHENTICATION_ERROR", statusCode: 401 }
 */
export class AuthenticationException extends HttpException {
  /**
   * 创建认证异常
   * @param message 错误消息，默认为 'Authentication failed'
   */
  constructor(message: string = 'Authentication failed') {
    super(
      {
        message,
        error: 'AUTHENTICATION_ERROR',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}

/**
 * 授权异常
 * 用于处理用户权限不足的情况
 * 
 * @example
 * throw new AuthorizationException('您没有权限访问此资源');
 * // 响应: { message: "您没有权限访问此资源", error: "AUTHORIZATION_ERROR", statusCode: 403 }
 */
export class AuthorizationException extends HttpException {
  /**
   * 创建授权异常
   * @param message 错误消息，默认为 'Insufficient permissions'
   */
  constructor(message: string = 'Insufficient permissions') {
    super(
      {
        message,
        error: 'AUTHORIZATION_ERROR',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN
    );
  }
}

/**
 * Token过期异常
 * 用于处理访问令牌过期的情况
 * 
 * @example
 * throw new TokenExpiredException();
 * // 响应: { message: "Token has expired", error: "TOKEN_EXPIRED", statusCode: 401 }
 */
export class TokenExpiredException extends HttpException {
  /**
   * 创建Token过期异常
   * 不需要参数，使用默认的过期消息
   */
  constructor() {
    super(
      {
        message: 'Token has expired',
        error: 'TOKEN_EXPIRED',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
