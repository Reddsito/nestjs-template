import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/prisma.module';
import { APP_FILTER, APP_PIPE, HttpAdapterHost } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod'
import { AuthModule } from './auth/auth.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { UsersModule } from './users/users.module';
import { ConfigVariables } from 'config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ConfigVariables]
    }),
    DatabaseModule,
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  },
  {
    provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost]
  }
],

})
export class AppModule {}
