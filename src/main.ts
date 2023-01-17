import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Challenge dev BRGaming')
    .setDescription('Restaurant manager Challenge dev BRGaming')
    .addTag('Restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const port = 3003 || process.env.PORT;
  await app.listen(port);
}
bootstrap();
