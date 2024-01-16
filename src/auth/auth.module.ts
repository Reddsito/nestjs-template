import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategies/refresh-jwt.stategy';
import { AccessTokenStrategy } from './strategies/access-jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({})
  ],
  exports: [AccessTokenStrategy,RefreshTokenStrategy , PassportModule, JwtModule]
})
export class AuthModule {}
