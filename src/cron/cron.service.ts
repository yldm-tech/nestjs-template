import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

import { CronJob } from 'cron';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CronJobService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(CronJobService.name);

  /**
   * 每xx秒调用一次
   */
  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async handleCron() {
  //   console.log('11111');
  // }

  /**
   * 每天凌晨0点调用一次(tokyo)
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'notifications',
    timeZone: 'Asia/Tokyo',
  })
  async triggerMidNightEvent() {
    console.log('triggerMidNightEvent');
  }

  /**
   * 每10秒调用一次
   */
  // @Interval(10000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  /**
   * 5秒后调用一次
   */
  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }

  // addCron(name: string, job: CronJob) {
  //   this.schedulerRegistry.addCronJob(name, job);
  //   this.logger.warn(`job ${name} added!`);
  // }

  /**
   * 删除指定名字的job
   * @param name jobName
   */
  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  /**
   * 获取所有cron job
   */
  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }

  /**
   * 添加一个interval
   * @param name jobName
   * @param milliseconds 间隔时间
   */
  addInterval(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    };
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  /**
   * 删除一个interval
   * @param name jobName
   */
  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
  }

  /**
   * 获取所有interval
   */
  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
  }

  /**
   * 添加一个timeout
   * @param name jobName
   * @param milliseconds 间隔时间
   */
  addTimeout(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
    };
    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
  }

  /**
   * 删除一个timeout
   * @param name jobName
   */
  deleteTimeout(name: string) {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.warn(`Timeout ${name} deleted!`);
  }

  /**
   * 获取所有timeout
   */
  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
  }
}
