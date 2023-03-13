import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';




async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(5000, '0.0.0.0');
  console.log("Server Running at http://localhost:5000");
}
bootstrap();
 