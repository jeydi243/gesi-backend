import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ErrorFilter } from './erros.filter';
import * as morganBody from 'morgan-body';
0;
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  app.use(cookieParser());
  app.enableCors();
  app.use(morgan('tiny'));
  // app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
      validationError: { value: true },
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Gesi')
    .setDescription("L'API de gestion d'université")
    .setVersion('1.0')
    .addTag('gesi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  (morganBody as any)(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        console.log(message.replace('\n', ''));
        return true;
      },
    },
  });
  await app.listen(3000);
}
bootstrap();
