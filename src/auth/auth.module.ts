import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'
import { jwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {expiresIn: configService.get('EXPIRES_IN') },
        };
      },
    }),
    UsersModule,
    PassportModule],
  providers: [AuthService, localStrategy, jwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
