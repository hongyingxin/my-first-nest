# Cats API

这是一个简单的 Cat API 示例，展示了 NestJS 的基本用法。

## API 端点

### 获取所有猫
```
GET /cats
```

可选查询参数：
- `breed`: 按品种筛选

示例：
```
GET /cats
GET /cats?breed=Persian
```

### 获取单个猫
```
GET /cats/:id
```

示例：
```
GET /cats/1
```

### 创建新猫
```
POST /cats
```

请求体：
```json
{
  "name": "Whiskers",
  "age": 3,
  "breed": "Persian"
}
```

### 更新猫信息
```
PUT /cats/:id
```

请求体（所有字段都是可选的）：
```json
{
  "name": "New Name",
  "age": 4
}
```

### 删除猫
```
DELETE /cats/:id
```

## 数据结构

### Cat 对象
```typescript
interface Cat {
  id: string;
  name: string;
  age: number;
  breed: string;
}
```

## 示例数据

应用启动时会包含以下示例数据：

1. **Whiskers** - 3岁波斯猫
2. **Fluffy** - 2岁缅因猫
3. **Shadow** - 4岁暹罗猫

## 测试

运行测试：
```bash
npm run test src/cats/cats.controller.spec.ts
```

## 模块结构

```
src/cats/
├── cats.controller.ts    # 控制器 - 处理 HTTP 请求
├── cats.service.ts      # 服务 - 业务逻辑
├── cats.module.ts       # 模块 - 组织代码
├── dto/
│   ├── create-cat.dto.ts    # 创建猫的 DTO
│   └── update-cat.dto.ts    # 更新猫的 DTO
└── README.md           # 本文档
``` 