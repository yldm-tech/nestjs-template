declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'stg' | 'prod' | 'local';
      /**
       * Database connection string
       */
      DATABASE_URL: string;
      /**
       * AWS id
       */
      AWS_ACCESS_KEY_ID: string;
      /**
       * AWS secret key
       */
      AWS_SECRET_ACCESS_KEY: string;
      /**
       * AWS region
       */
      AWS_REGION: string;
      /**
       * AWS bucket name
       */
      AWS_BUCKET_NAME: string;
      /**
       * JWT secret
       */
      JWT_SECRET: string;
      /**
       * redis host
       */
      REDIS_HOST: string;
      /**
       * redis port
       */
      REDIS_PORT: number;
      /**
       * redis username
       */
      REDIS_USERNAME?: string;
      /**
       * redis pwd
       */
      REDIS_PASSWORD?: string;
      /**
       * redis db name
       */
      REDIS_DB?: number;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CALLBACK_URL: string;
      [x: string]: string | undefined;
    }
  }
}
export {};
