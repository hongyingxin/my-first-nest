# Nest.js 进阶学习计划
## 针对7年前端经验工程师的后端转型路径

> **学习背景**：基于已完成 Nest.js 概述模块，制定的6周进阶学习计划  
> **目标人群**：7年前端开发经验，具备扎实的 TypeScript/JavaScript 基础  
> **最终目标**：掌握企业级 Node.js 后端开发，具备全栈开发能力

---

## 📚 **学习前置说明**

### **优势分析**
- ✅ **TypeScript 熟练**：可快速理解装饰器、泛型等高级特性
- ✅ **现代化工具链**：熟悉 npm/pnpm、模块化、构建工具
- ✅ **异步编程**：Promise/async-await 使用经验丰富
- ✅ **API 调用经验**：理解 HTTP 协议、RESTful 设计

### **需要转换的思维**
- 🔄 **从消费 API 到设计 API**：关注接口设计、数据建模
- 🔄 **从客户端到服务端**：理解服务器架构、数据库设计
- 🔄 **从状态管理到业务逻辑**：专注后端业务流程设计

---

## 🎯 **6周学习路线图**

```mermaid
graph TD
    A[Week 1: 核心架构] --> B[Week 2: 数据层]
    B --> C[Week 3: 安全认证]
    C --> D[Week 4: 企业特性]
    D --> E[Week 5: 生产级]
    E --> F[Week 6: 工程化]
    
    A1[依赖注入<br/>动态模块] --> A
    B1[数据库设计<br/>ORM 实践] --> B
    C1[JWT 认证<br/>权限控制] --> C
    D1[数据验证<br/>异常处理] --> D
    E1[缓存优化<br/>监控日志] --> E
    F1[测试部署<br/>文档规范] --> F
```

---

## 📅 **详细学习计划**

### **第1周：核心架构深化**
> **重点**：理解 Nest.js 的设计哲学，建立后端架构思维

#### **Day 1-2：依赖注入系统**
**理论学习**
- [依赖注入文档](https://docs.nestjs.cn/fundamentals/dependency-injection)
- [Provider 作用域](https://docs.nestjs.cn/fundamentals/provider-scopes)

**关键概念**
```typescript
// 理解控制反转(IoC)的核心思想
// 前端：手动 import 和实例化
import UserAPI from './user-api';
const userAPI = new UserAPI();

// 后端：通过 DI 容器管理
@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {} // 自动注入
}
```

**实践任务**
1. 改造现有 `cats/dogs` 服务，使用自定义提供者
2. 实现配置提供者工厂
3. 创建可选依赖注入示例

**代码实现**
```typescript
// 任务1: 配置工厂提供者
const configFactory = {
  provide: 'APP_CONFIG',
  useFactory: () => ({
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
    }
  })
};

// 任务2: 在服务中注入配置
@Injectable()
export class CatsService {
  constructor(
    @Inject('APP_CONFIG') private config: AppConfig,
    private httpService: HttpService,
  ) {
    console.log('Database config:', this.config.database);
  }
}
```

#### **Day 3-4：动态模块系统**
**理论学习**
- [动态模块](https://docs.nestjs.cn/fundamentals/dynamic-modules)
- [异步组件](https://docs.nestjs.cn/fundamentals/async-components)

**实践任务**
1. 创建 `ConfigModule` 动态模块
2. 实现数据库配置的异步加载
3. 模块导出和重用

**代码实现**
```typescript
// 动态配置模块
@Module({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
      global: true, // 全局模块
    };
  }
}

// 在 AppModule 中使用
@Module({
  imports: [
    ConfigModule.forRoot({
      folder: './config',
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
```

#### **Day 5-7：架构最佳实践**
**实践任务**
1. 重构项目结构，采用模块化设计
2. 实现跨模块服务共享
3. 循环依赖处理实践

**项目结构优化**
```
src/
├── shared/                 # 共享模块
│   ├── config/            # 配置管理
│   ├── database/          # 数据库配置
│   └── utils/             # 工具函数
├── features/              # 业务功能模块
│   ├── cats/
│   ├── dogs/
│   └── users/
├── common/                # 公共组件
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
└── main.ts
```

---

### **第2周：数据层设计与实现**
> **重点**：数据库设计思维，ORM 使用，关系建模

#### **Day 1-2：数据库技术选型**
**理论对比**
| 特性 | TypeORM | Prisma |
|------|---------|---------|
| 学习曲线 | 陡峭 | 平缓 |
| 类型安全 | 良好 | 优秀 |
| 性能 | 高 | 高 |
| 生态 | 成熟 | 新兴 |
| **推荐度** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**选择建议**：基于前端背景，推荐 **Prisma**（类型安全更好，开发体验更佳）

#### **Day 3-4：数据建模实践**
**业务模型设计**
```typescript
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // 关系
  cats      Cat[]
  dogs      Dog[]
  posts     Post[]
}

model Cat {
  id       Int    @id @default(autoincrement())
  name     String
  breed    String
  age      Int
  ownerId  Int
  
  // 关系
  owner    User   @relation(fields: [ownerId], references: [id])
  
  @@map("cats")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  createdAt DateTime @default(now())
  
  // 关系
  author    User     @relation(fields: [authorId], references: [id])
  tags      Tag[]    @relation("PostTags")
  
  @@map("posts")
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[] @relation("PostTags")
  
  @@map("tags")
}
```

**实践任务**
1. 安装和配置 Prisma
2. 设计完整的数据模型
3. 生成 Prisma Client
4. 数据库迁移

#### **Day 5-7：服务层重构**
**数据访问层设计**
```typescript
// base.repository.ts - 通用仓储模式
export abstract class BaseRepository<T> {
  constructor(protected prisma: PrismaService) {}
  
  abstract findAll(params?: any): Promise<T[]>;
  abstract findById(id: number): Promise<T | null>;
  abstract create(data: any): Promise<T>;
  abstract update(id: number, data: any): Promise<T>;
  abstract delete(id: number): Promise<boolean>;
}

// cats.repository.ts
@Injectable()
export class CatsRepository extends BaseRepository<Cat> {
  async findAll(params?: { take?: number; skip?: number }) {
    return this.prisma.cat.findMany({
      take: params?.take || 10,
      skip: params?.skip || 0,
      include: { owner: true },
    });
  }
  
  async findByOwner(ownerId: number) {
    return this.prisma.cat.findMany({
      where: { ownerId },
      include: { owner: true },
    });
  }
  
  async create(data: CreateCatDto) {
    return this.prisma.cat.create({
      data,
      include: { owner: true },
    });
  }
  
  // ... 其他方法
}

// cats.service.ts - 业务逻辑层
@Injectable()
export class CatsService {
  constructor(private catsRepository: CatsRepository) {}
  
  async findAllCats(query: QueryCatsDto) {
    return this.catsRepository.findAll({
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });
  }
  
  async createCat(createCatDto: CreateCatDto, userId: number) {
    // 业务逻辑验证
    if (createCatDto.age < 0) {
      throw new BadRequestException('年龄不能为负数');
    }
    
    return this.catsRepository.create({
      ...createCatDto,
      ownerId: userId,
    });
  }
}
```

---

### **第3周：安全认证体系**
> **重点**：JWT 认证，权限控制，安全守卫

#### **Day 1-2：认证系统设计**
**JWT 认证流程**
```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth Controller
    participant S as Auth Service
    participant DB as Database
    
    C->>A: POST /auth/login {email, password}
    A->>S: validateUser(email, password)
    S->>DB: findUser(email)
    DB-->>S: user data
    S->>S: comparePassword(password, hashedPassword)
    S-->>A: user (if valid)
    A->>S: login(user)
    S->>S: generateJWT(user)
    S-->>A: { access_token, user }
    A-->>C: { access_token, user }
    
    Note over C,DB: 后续请求携带 token
    C->>A: GET /cats (Authorization: Bearer <token>)
    A->>A: AuthGuard.canActivate()
    A->>A: verify JWT token
    A-->>C: cats data (if authorized)
```

**实现代码**
```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    return this.login(user);
  }
}

// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token 无效或已过期');
    }
    return user;
  }
}
```

#### **Day 3-4：权限控制系统**
**基于角色的权限控制(RBAC)**
```typescript
// roles.enum.ts
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

// roles.decorator.ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}

// cats.controller.ts - 使用示例
@Controller('cats')
@UseGuards(JwtAuthGuard)
export class CatsController {
  
  @Get()
  @Roles(Role.USER, Role.ADMIN) // 用户和管理员都可以查看
  @UseGuards(RolesGuard)
  findAll() {
    return this.catsService.findAll();
  }
  
  @Delete(':id')
  @Roles(Role.ADMIN) // 只有管理员可以删除
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
```

#### **Day 5-7：安全最佳实践**
**实现功能**
1. 密码加密和验证
2. Token 刷新机制
3. 请求限流
4. CORS 配置

**代码实现**
```typescript
// main.ts - 全局安全配置
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 配置
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    credentials: true,
  });
  
  // 全局守卫
  app.useGlobalGuards(new JwtAuthGuard());
  
  // 全局管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // 限流
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  
  await app.listen(3000);
}
```

---

### **第4周：企业级特性开发**
> **重点**：数据验证，异常处理，响应拦截，中间件

#### **Day 1-2：数据验证系统**
**DTO 设计和验证**
```typescript
// create-cat.dto.ts
export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

// query-cats.dto.ts
export class QueryCatsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

// 自定义验证器
@ValidatorConstraint({ name: 'isBreedValid', async: false })
export class IsBreedValidConstraint implements ValidatorConstraintInterface {
  validate(breed: string, args: ValidationArguments) {
    const validBreeds = ['Persian', 'Siamese', 'Maine Coon', 'British Shorthair'];
    return validBreeds.includes(breed);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Breed must be one of: Persian, Siamese, Maine Coon, British Shorthair';
  }
}

export function IsBreedValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsBreedValidConstraint,
    });
  };
}
```

#### **Day 3-4：异常处理系统**
**全局异常过滤器**
```typescript
// all-exceptions.filter.ts
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;
    let error: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exceptionResponse;
        error = (exceptionResponse as any).error || exception.constructor.name;
      } else {
        message = exceptionResponse;
        error = exception.constructor.name;
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // 数据库错误处理
      status = 400;
      switch (exception.code) {
        case 'P2002':
          message = '数据已存在，请检查唯一性约束';
          error = 'Duplicate Entry';
          break;
        case 'P2025':
          message = '记录不存在';
          error = 'Record Not Found';
          break;
        default:
          message = '数据库操作失败';
          error = 'Database Error';
      }
    } else {
      // 未知错误
      status = 500;
      message = 'Internal server error';
      error = 'Internal Server Error';
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    };

    // 记录错误日志
    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      exception instanceof Error ? exception.stack : 'No stack trace'
    );

    response.status(status).json(errorResponse);
  }
}

// 业务异常类
export class BusinessException extends HttpException {
  constructor(message: string, code?: string) {
    super(
      {
        message,
        error: 'Business Error',
        code,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

// 使用示例
@Injectable()
export class CatsService {
  async findOne(id: number) {
    const cat = await this.catsRepository.findById(id);
    if (!cat) {
      throw new BusinessException(`ID为 ${id} 的猫咪不存在`, 'CAT_NOT_FOUND');
    }
    return cat;
  }
}
```

#### **Day 5-7：响应拦截和中间件**
**统一响应格式**
```typescript
// response.interceptor.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  path: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        message: 'success',
        timestamp: new Date().toISOString(),
        path: request.url,
      }))
    );
  }
}

// logging.interceptor.ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;
    
    const now = Date.now();
    
    this.logger.log(
      `${method} ${url} - ${ip} - ${userAgent} - Request: ${JSON.stringify({
        body,
        query,
        params,
      })}`
    );

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(
          `${method} ${url} - ${ip} - ${userAgent} - Response time: ${responseTime}ms`
        );
      })
    );
  }
}

// 请求ID中间件
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = req.headers['x-request-id'] || uuidv4();
    req['requestId'] = requestId;
    res.set('x-request-id', requestId);
    next();
  }
}
```

---

### **第5周：生产级特性实现**
> **重点**：配置管理，缓存优化，日志系统，性能监控

#### **Day 1-2：配置管理系统**
```typescript
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nestjs_app',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  }
});

// config/validation.ts
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
});

// app.module.ts
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
})
export class AppModule {}
```

#### **Day 3-4：缓存系统实现**
```typescript
// cache.service.ts
@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl || 300);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  // 缓存装饰器
  async remember<T>(
    key: string, 
    callback: () => Promise<T>, 
    ttl: number = 300
  ): Promise<T> {
    let result = await this.get<T>(key);
    
    if (result === null) {
      result = await callback();
      await this.set(key, result, ttl);
    }
    
    return result;
  }
}

// cache.decorator.ts
export function Cacheable(keyPrefix: string, ttl: number = 300) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const cacheService = this.cacheService as CacheService;
      const key = `${keyPrefix}:${JSON.stringify(args)}`;
      
      return await cacheService.remember(
        key,
        () => method.apply(this, args),
        ttl
      );
    };
  };
}

// 使用示例
@Injectable()
export class CatsService {
  constructor(
    private catsRepository: CatsRepository,
    private cacheService: CacheService,
  ) {}

  @Cacheable('cats:all', 600) // 缓存10分钟
  async findAll(query: QueryCatsDto) {
    return this.catsRepository.findAll(query);
  }

  async create(createCatDto: CreateCatDto) {
    const cat = await this.catsRepository.create(createCatDto);
    
    // 创建后清除相关缓存
    await this.cacheService.del('cats:all:*');
    
    return cat;
  }
}
```

#### **Day 5-7：监控和日志系统**
```typescript
// logger.service.ts
@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'nestjs-app' },
      transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}

// metrics.service.ts - 性能监控
@Injectable()
export class MetricsService {
  private readonly prometheus = require('prom-client');
  private readonly httpRequestDuration: any;
  private readonly httpRequestTotal: any;

  constructor() {
    // 创建指标
    this.httpRequestDuration = new this.prometheus.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.1, 0.5, 1, 2, 5],
    });

    this.httpRequestTotal = new this.prometheus.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });

    // 收集默认指标
    this.prometheus.collectDefaultMetrics();
  }

  recordHttpRequest(method: string, route: string, status: number, duration: number) {
    this.httpRequestDuration
      .labels(method, route, status.toString())
      .observe(duration);
    
    this.httpRequestTotal
      .labels(method, route, status.toString())
      .inc();
  }

  getMetrics() {
    return this.prometheus.register.metrics();
  }
}

// health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.redis.checkHealth('redis'),
    ]);
  }

  @Get('metrics')
  metrics(@Res() res: Response) {
    res.set('Content-Type', this.prometheus.register.contentType);
    res.end(this.prometheus.register.metrics());
  }
}
```

---

### **第6周：测试与工程化**
> **重点**：单元测试，集成测试，API文档，部署流程

#### **Day 1-2：测试体系建设**
```typescript
// cats.service.spec.ts - 单元测试
describe('CatsService', () => {
  let service: CatsService;
  let repository: CatsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repository = module.get<CatsRepository>(CatsRepository);
  });

  describe('findAll', () => {
    it('应该返回猫咪列表', async () => {
      const mockCats = [
        { id: 1, name: 'Tom', breed: 'Persian', age: 3 },
        { id: 2, name: 'Jerry', breed: 'Siamese', age: 2 },
      ];
      
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockCats);

      const result = await service.findAll({});
      
      expect(result).toEqual(mockCats);
      expect(repository.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('create', () => {
    it('应该创建新猫咪', async () => {
      const createCatDto = { name: 'Fluffy', breed: 'Persian', age: 1 };
      const mockCat = { id: 1, ...createCatDto };
      
      jest.spyOn(repository, 'create').mockResolvedValue(mockCat);

      const result = await service.create(createCatDto);
      
      expect(result).toEqual(mockCat);
      expect(repository.create).toHaveBeenCalledWith(createCatDto);
    });

    it('当年龄为负数时应该抛出异常', async () => {
      const createCatDto = { name: 'Invalid', breed: 'Persian', age: -1 };
      
      await expect(service.create(createCatDto)).rejects.toThrow(
        '年龄不能为负数'
      );
    });
  });
});

// cats.controller.e2e-spec.ts - E2E测试
describe('Cats (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    
    await app.init();
  });

  beforeEach(async () => {
    // 清理测试数据
    await prisma.cat.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('/cats (GET)', () => {
    it('应该返回空数组当没有猫咪时', () => {
      return request(app.getHttpServer())
        .get('/cats')
        .expect(200)
        .expect({
          success: true,
          data: [],
          message: 'success',
        });
    });

    it('应该返回猫咪列表', async () => {
      // 创建测试数据
      const user = await prisma.user.create({
        data: { email: 'test@example.com', name: 'Test User' },
      });
      
      await prisma.cat.create({
        data: { name: 'Tom', breed: 'Persian', age: 3, ownerId: user.id },
      });

      return request(app.getHttpServer())
        .get('/cats')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveLength(1);
          expect(res.body.data[0].name).toBe('Tom');
        });
    });
  });

  describe('/cats (POST)', () => {
    it('应该创建新猫咪', async () => {
      const user = await prisma.user.create({
        data: { email: 'test@example.com', name: 'Test User' },
      });

      const createCatDto = {
        name: 'Fluffy',
        breed: 'Persian',
        age: 2,
        ownerId: user.id,
      };

      return request(app.getHttpServer())
        .post('/cats')
        .send(createCatDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.name).toBe('Fluffy');
        });
    });

    it('应该验证必填字段', () => {
      return request(app.getHttpServer())
        .post('/cats')
        .send({})
        .expect(400)
        .expect((res) => {
          expect(res.body.success).toBe(false);
          expect(res.body.message).toContain('name should not be empty');
        });
    });
  });
});
```

#### **Day 3-4：API 文档系统**
```typescript
// main.ts - Swagger 配置
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 文档配置
  const config = new DocumentBuilder()
    .setTitle('Pet Management API')
    .setDescription('宠物管理系统 API 文档')
    .setVersion('1.0')
    .addTag('cats', '猫咪管理')
    .addTag('dogs', '狗狗管理')
    .addTag('auth', '认证授权')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}

// cats.controller.ts - API 文档注解
@ApiTags('cats')
@Controller('cats')
@ApiBearerAuth('JWT-auth')
export class CatsController {
  
  @Get()
  @ApiOperation({ summary: '获取猫咪列表' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取猫咪列表',
    type: [Cat],
  })
  @ApiQuery({ name: 'page', required: false, description: '页码' })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量' })
  @ApiQuery({ name: 'breed', required: false, description: '品种筛选' })
  findAll(@Query() query: QueryCatsDto) {
    return this.catsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '创建新猫咪' })
  @ApiResponse({ 
    status: 201, 
    description: '成功创建猫咪',
    type: Cat,
  })
  @ApiResponse({ 
    status: 400, 
    description: '请求参数错误',
  })
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取猫咪' })
  @ApiParam({ name: 'id', description: '猫咪ID' })
  @ApiResponse({ 
    status: 200, 
    description: '成功获取猫咪信息',
    type: Cat,
  })
  @ApiResponse({ 
    status: 404, 
    description: '猫咪不存在',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}

// dto 文档注解
export class CreateCatDto {
  @ApiProperty({ description: '猫咪名称', example: 'Tom' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '猫咪品种', example: 'Persian' })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({ description: '猫咪年龄', example: 3, minimum: 0, maximum: 30 })
  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @ApiPropertyOptional({ description: '猫咪描述', example: 'A lovely cat' })
  @IsOptional()
  @IsString()
  description?: string;
}

// entities 文档注解
@ApiTags('entities')
export class Cat {
  @ApiProperty({ description: '猫咪ID', example: 1 })
  id: number;

  @ApiProperty({ description: '猫咪名称', example: 'Tom' })
  name: string;

  @ApiProperty({ description: '猫咪品种', example: 'Persian' })
  breed: string;

  @ApiProperty({ description: '猫咪年龄', example: 3 })
  age: number;

  @ApiProperty({ description: '创建时间', example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间', example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
```

#### **Day 5-7：部署和CI/CD**
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 生成 Prisma 客户端
RUN pnpm prisma generate

# 构建应用
RUN pnpm build

# 生产阶段
FROM node:18-alpine AS production

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json
COPY package.json pnpm-lock.yaml ./

# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 复制构建文件和必要文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# 更改文件所有权
USER nestjs

EXPOSE 3000

CMD ["node", "dist/main"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/nestjs_app
      - REDIS_HOST=redis
      - JWT_SECRET=your-secret-key
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=nestjs_app
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: password
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install --frozen-lockfile
      
    - name: Generate Prisma Client
      run: pnpm prisma generate
      
    - name: Run migrations
      run: pnpm prisma migrate deploy
      env:
        DATABASE_URL: postgresql://postgres:password@localhost:5432/test_db
        
    - name: Run unit tests
      run: pnpm test
      
    - name: Run e2e tests
      run: pnpm test:e2e
      env:
        DATABASE_URL: postgresql://postgres:password@localhost:5432/test_db
        
    - name: Build application
      run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v3
      with:
        context: .
        push: true
        tags: your-registry/nestjs-app:latest
        
    - name: Deploy to production
      run: |
        # 部署脚本
        echo "Deploying to production..."
```

---

## 📚 **学习资源补充**

### **官方文档路径**
1. **基础概念**：https://docs.nestjs.cn/fundamentals
2. **技术特性**：https://docs.nestjs.cn/techniques  
3. **安全指南**：https://docs.nestjs.cn/security
4. **测试指南**：https://docs.nestjs.cn/fundamentals/testing

### **推荐实践项目**
基于学习进度，逐步构建：
```
Week 1: 基础架构搭建
Week 2: 用户-宠物管理系统  
Week 3: 认证授权完善
Week 4: 数据验证和异常处理
Week 5: 缓存和监控
Week 6: 测试和部署
```

### **技术栈建议**
```typescript
// 核心技术栈
Framework: Nest.js
Database: PostgreSQL + Prisma
Cache: Redis  
Auth: JWT + Passport
Testing: Jest + Supertest
Docs: Swagger/OpenAPI
Deploy: Docker + Docker Compose
```

---

## 🎯 **学习检查清单**

### **每周检查点**
- [ ] **Week 1**: 理解依赖注入，能创建动态模块
- [ ] **Week 2**: 掌握数据库操作，完成 CRUD 功能
- [ ] **Week 3**: 实现 JWT 认证，角色权限控制
- [ ] **Week 4**: 全局异常处理，数据验证管道
- [ ] **Week 5**: 缓存集成，日志监控系统
- [ ] **Week 6**: 测试覆盖，API 文档，部署流程

### **最终成果**
一个包含以下特性的生产级宠物管理系统：
- ✅ 用户认证和权限管理
- ✅ 完整的 CRUD 操作
- ✅ 数据验证和错误处理  
- ✅ 缓存和性能优化
- ✅ 完整的测试覆盖
- ✅ API 文档和部署流程

---

## 💡 **学习建议**

### **对于前端背景的特别建议**
1. **思维转换**：从状态管理转向业务逻辑设计
2. **数据建模**：重点理解关系型数据库设计
3. **安全意识**：后端安全责任比前端更重
4. **性能考虑**：关注数据库查询优化、缓存策略

### **学习节奏控制**
- **理论学习**：每天2小时文档阅读
- **代码实践**：每天3-4小时编码实践  
- **总结复盘**：每周1小时知识整理
- **项目完善**：持续迭代，注重代码质量

### **遇到问题时**
1. **查阅官方文档**：优先参考 Nest.js 官方文档
2. **GitHub Issues**：查看相关问题的解决方案
3. **社区讨论**：参与 Nest.js 中文社区讨论
4. **实践验证**：通过编码验证理解是否正确

---

**祝学习顺利！记住：从前端到后端，不只是技术栈的切换，更是思维方式的转变。重点关注数据建模、业务逻辑设计和系统架构思维的培养。**
