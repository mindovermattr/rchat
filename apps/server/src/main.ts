import { NestFactory } from '@nestjs/core';
import { SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { spec } from './openapi/openapi-spec';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.CLIENT_ORIGIN ?? true });

  SwaggerModule.setup('docs', app, spec as unknown as OpenAPIObject);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
