import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigVariables } from 'config/configuration';

async function bootstrap() {
  const config = ConfigVariables();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/')
  await app.listen(config.port);
}
bootstrap();
