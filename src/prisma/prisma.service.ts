import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const envUrl = process.env.DATABASE_URL;
    const configUrl = configService.get('DATABASE_URL');
    super({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: envUrl || configUrl,
        },
      },
    });
  }

  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query}`,
        `Params: ${event.params}`,
        `Duration: ${event.duration} ms`,
      );
    });
    this.$on('info', (event) => {
      this.logger.log(`${event.message}`);
    });
    this.$on('error', (event) => {
      this.logger.error(`${event.message}`);
    });
    this.$on('warn', (event) => {
      this.logger.warn(` ${event.message}`);
    });
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
