# Apifox 接入指南

## 方法一：通过 Swagger 文档导入（推荐）

### 1. 启动应用
```bash
pnpm run start:dev
```

### 2. 访问 Swagger 文档
打开浏览器访问：http://localhost:3000/api

### 3. 在 Apifox 中导入

1. **打开 Apifox**
2. **创建新项目** 或选择现有项目
3. **导入 API**：
   - 点击 "导入" 按钮
   - 选择 "从 URL 导入"
   - 输入 URL：`http://localhost:3000/api-json`
   - 点击 "导入"

### 4. 验证导入
导入后，你应该能看到以下 API 端点：

- `GET /cats` - 获取所有猫
- `GET /cats/{id}` - 根据ID获取猫
- `POST /cats` - 创建新猫
- `PUT /cats/{id}` - 更新猫信息
- `DELETE /cats/{id}` - 删除猫

## 方法二：手动创建 API 文档

### 1. 创建项目结构
```
Cats API
├── 环境变量
│   ├── baseUrl: http://localhost:3000
│   └── port: 3000
├── 接口分组
│   └── Cats
│       ├── 获取所有猫
│       ├── 获取单个猫
│       ├── 创建猫
│       ├── 更新猫
│       └── 删除猫
```

### 2. 接口详情

#### GET /cats
- **路径**: `/cats`
- **查询参数**: 
  - `breed` (可选): 按品种筛选
- **响应示例**:
```json
[
  {
    "id": "1",
    "name": "Whiskers",
    "age": 3,
    "breed": "Persian"
  }
]
```

#### GET /cats/{id}
- **路径**: `/cats/{id}`
- **路径参数**: `id` (string)
- **响应示例**:
```json
{
  "id": "1",
  "name": "Whiskers",
  "age": 3,
  "breed": "Persian"
}
```

#### POST /cats
- **路径**: `/cats`
- **请求体**:
```json
{
  "name": "Mittens",
  "age": 2,
  "breed": "Tabby"
}
```

#### PUT /cats/{id}
- **路径**: `/cats/{id}`
- **路径参数**: `id` (string)
- **请求体** (所有字段可选):
```json
{
  "name": "New Name",
  "age": 4
}
```

#### DELETE /cats/{id}
- **路径**: `/cats/{id}`
- **路径参数**: `id` (string)
- **响应示例**:
```json
{
  "message": "Cat with ID 1 has been removed"
}
```

## 方法三：使用 OpenAPI 规范文件

### 1. 导出 OpenAPI 规范
访问：http://localhost:3000/api-json
将内容保存为 `cats-api.json`

### 2. 在 Apifox 中导入
1. 点击 "导入"
2. 选择 "从文件导入"
3. 上传 `cats-api.json` 文件

## 测试建议

### 1. 环境配置
在 Apifox 中创建环境变量：
- `baseUrl`: `http://localhost:3000`

### 2. 测试流程
1. **获取所有猫**: `GET {{baseUrl}}/cats`
2. **创建新猫**: `POST {{baseUrl}}/cats`
3. **获取单个猫**: `GET {{baseUrl}}/cats/1`
4. **更新猫**: `PUT {{baseUrl}}/cats/1`
5. **删除猫**: `DELETE {{baseUrl}}/cats/1`

### 3. 数据验证
- 确保请求体格式正确
- 验证响应状态码
- 检查响应数据结构

## 常见问题

### Q: 导入后看不到接口？
A: 确保应用正在运行，并且 Swagger 文档可以正常访问。

### Q: 测试时出现 CORS 错误？
A: 这是正常的，Apifox 是客户端工具，不会遇到 CORS 问题。

### Q: 如何添加认证？
A: 在 Apifox 的环境变量中添加认证信息，或在接口中配置认证方式。

## 扩展功能

### 1. 添加数据模型
在 Apifox 中创建数据模型：
- `Cat`: 猫的数据结构
- `CreateCatDto`: 创建猫的请求体
- `UpdateCatDto`: 更新猫的请求体

### 2. 设置测试用例
创建自动化测试：
- 测试 CRUD 操作
- 验证错误处理
- 测试数据验证

### 3. 生成代码
使用 Apifox 生成客户端代码：
- TypeScript/JavaScript
- Python
- Java
- 其他语言 