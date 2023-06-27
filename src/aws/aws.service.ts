import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  public s3: AWS.S3;
  public secretManager: AWS.SecretsManager;

  constructor(private readonly config: ConfigService) {
    const profile = this.config.get<string>('PROFILE');
    if (profile) {
      AWS.config.credentials = new AWS.SharedIniFileCredentials({
        profile: profile,
      });
    }

    this.s3 = new AWS.S3();
    this.secretManager = new AWS.SecretsManager();
  }

  async getSecretValue(secretName: string): Promise<any> {
    const secret = await this.secretManager
      .getSecretValue({ SecretId: secretName })
      .promise();
    return JSON.parse(secret.SecretString);
  }
}
