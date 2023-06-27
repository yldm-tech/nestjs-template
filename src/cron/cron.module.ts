import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './cron.service';
import { PrismaService } from '../prisma/prisma.service';
import { AwsService } from '../aws/aws.service';

@Module({
  imports: [ScheduleModule.forRoot()], // 👈 定时任务模块
  providers: [CronJobService, PrismaService, AwsService],
})
export class CronModule {}
