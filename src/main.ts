import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Application is running on: http://localhost:3000');
  console.log('📚 Swagger documentation: http://localhost:3000/api');
}
bootstrap();
