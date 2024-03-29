import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { OtherException } from './filters/other-exception.filter';
import * as morganBody from 'morgan-body';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Handler } from 'aws-lambda';
import { configure } from '@vendia/serverless-express';

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['error', 'warn', 'log'] });
  // const httpAdapter = app.get(HttpAdapterHost);
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new OtherException());
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
      exceptionFactory: (errors: ValidationError[]) => {
        // eslint-disable-next-line prefer-const
        let obje = {};
        errors.forEach(el => {
          console.log(el.constraints);

          const messages = [];
          for (const key in el.constraints) {
            messages.unshift(el.constraints[key]);
          }
          console.log({ messages });
          if (obje.hasOwnProperty(el.property)) {
            obje[el.property] = [...obje[el.property], ...messages];
          } else {
            obje[el.property] = [...messages];
          }
        });
        // const dto_validation_error = errors.map(el => {
        //   // return { `${el.property}`:  };
        // });

        return new HttpException({ dto_validation_error: obje }, HttpStatus.BAD_REQUEST);
      },
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

  await app.init();
  const expApp = app.getHttpAdapter().getInstance();
  console.log('NODE_ENV = %s \nMONGO_URI_DEV = %s \nMONGO_ATLAS_URI = %s', process.env.NODE_ENV, process.env.MONGO_URI_DEV, process.env.MONGO_ATLAS_URI);
  console.log('App listen on port 9000');
  // return serverlessExpress({ app: expApp });
  return configure({ app: expApp });
}

export const handler: Handler = async (event, context, callback) => {
  server = server ?? (await bootstrap());

  return server(event, context, callback);
};
