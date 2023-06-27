// create a singleton instance of the PrismaService, allow
// sharing the service throughout the application
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AwsService } from '../aws/aws.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService, AwsService, ConfigService],
})
export class PrismaModule {}
