import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interface/payload";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor(
    readonly configService: ConfigService
  ){
    super({
      passReqToCallback: true,
      secretOrKey: configService.get<string>('jwtRefreshSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }
  
  async validate(
    req: Request,
    payload: JwtPayload
  ) {

    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()
    return {
      ...payload,
      refreshToken
    }
  }
}