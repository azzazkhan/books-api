import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  const port = process.env.PORT || 8000;
  await app.listen(port, () =>
    console.log(`The server is running on http://localhost:${port}`),
  );
}
bootstrap();
