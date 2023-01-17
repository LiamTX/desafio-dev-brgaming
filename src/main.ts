import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3003 || process.env.PORT;
  await app.listen(port);
}
bootstrap();
