import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter, HttpExceptionFilter } from './filters/http-exception.filter';
import { OtherException } from './filters/other-exception.filter';
import * as morganBody from 'morgan-body';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  const httpAdapter = app.get(HttpAdapterHost);
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new OtherException());
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalInterceptors(new InterceptorHTTP());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
      validationError: { value: true, target: true },
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder().setTitle('Gesi').setDescription("L'API de gestion d'université").setVersion('1.0').addTag('gesi').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  (morganBody as any)(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        console.log(message);
        return true;
      },
    },
  });

  await app.listen(3000);
}

bootstrap();
