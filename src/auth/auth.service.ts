import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interface/payload';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  )
  {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {

    const userExists = await this.usersService.findByUsername(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.create({ ...createUserDto});
    
    const tokens = await this.getTokens({sub: newUser.id, email: newUser.email, role: newUser.roles})


    return { 
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
           }
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto
    
    const user = await this.usersService.findByUsername(email);

    if (!user) throw new UnauthorizedException('Invalid username or password')
    

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new UnauthorizedException('Invalid username or password')

    const tokens = await this.getTokens({sub: user.id, email: user.email, role: user.roles})


    return { 
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
           }
  }

  private async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          secret: this.configService.get<string>('jwtAccessSecret'),
          expiresIn: '50m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          secret: this.configService.get<string>('jwtRefreshSecret'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshTokens(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user )
      throw new ForbiddenException('Access Denied');
 
      const tokens = await this.getTokens({sub: user.id, email: user.email, role: user.roles})

      return tokens;
  }

}
