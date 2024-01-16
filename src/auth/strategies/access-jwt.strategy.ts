import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/models/user.model";
import { JwtPayload } from "../interface/payload";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    private readonly userService: UsersService,
    readonly configService: ConfigService
  ){
    super({
      secretOrKey: configService.get<string>('jwtAccessSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }
  
  async validate(
    payload: JwtPayload
  ): Promise<User> {
    const { sub } = payload

    const user = await this.userService.findOne(sub)

    if (!user) throw new UnauthorizedException('Token no valid')

    if (!user.isActive) throw new UnauthorizedException('User is inactive, talk with an admin')

    return user

  }
}