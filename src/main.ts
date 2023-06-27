import { AllExceptionsFilter } from './utils/interceptor/all-exception.interceptor';
import {
  Logger,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as compression from 'compression';
import * as yaml from 'js-yaml';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { AppModule } from './app/app.module';
import { PrismaClientExceptionFilter } from './utils/filter/prisma-client-exception_filter';
import { description, name, version } from './../package.json';

const logger = new Logger('main');

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 提高性能
  app.use(compression());

  // global pipes
  app.useGlobalPipes(new ValidationPipe({}));

  // global interceptor
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());

  // apply the exception filters to the entire application
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  if (!process.env.local) {
    app.useGlobalFilters(new AllExceptionsFilter());
  }

  // version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  // app.enableShutdownHooks();

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
      },
      'Authorization',
    )
    .addSecurity('AccessToken', {
      type: 'apiKey',
      in: 'header',
      name: 'AccessToken',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerUrl: `http://127.0.0.1:${port}/docs`,
    swaggerOptions: {
      url: `http://127.0.0.1:${port}/docs/swagger.json`,
      https: false,
      schemes: ['http'],
    },
  });
  const yamlDocument = yaml.dump(document);
  fs.writeFileSync('./swagger.yaml', yamlDocument, 'utf8');

  // cookie
  app.use(cookieParser());
  // security
  app.use(helmet());
  app.enableCors();
  app.use(
    csurf({
      cookie: true,
      value: readCsrfToken,
    }),
  ); // 必须在cookieParser之后
  await app.listen(port);
}

bootstrap().then(async () => {
  logger.log(`http://127.0.0.1:${port}/docs`);
});

function readCsrfToken(req) {
  return req.csrfToken();
}
