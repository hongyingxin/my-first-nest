/**
 * 自定义异常统一导出文件
 * 
 * 包含以下异常类型：
 * - 业务异常：BusinessException, ResourceNotFoundException, ResourceAlreadyExistsException
 * - 验证异常：ValidationException, InvalidInputException  
 * - 认证授权异常：AuthenticationException, AuthorizationException, TokenExpiredException
 * 
 * @example
 * import { ResourceNotFoundException, ValidationException } from '../exceptions';
 * 
 * // 使用业务异常
 * throw new ResourceNotFoundException('User', '123');
 * 
 * // 使用验证异常
 * throw new ValidationException('请求参数验证失败', ['name is required']);
 * 
 * // 使用认证异常
 * throw new AuthenticationException('用户名或密码错误');
 */

// 业务异常
export * from './business.exception';

// 验证异常
export * from './validation.exception';

// 认证授权异常
export * from './auth.exception';
