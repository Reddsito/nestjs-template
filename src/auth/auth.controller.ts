import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/users/models/user.model';
import { Role } from 'src/users/dto/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  async signIn(@Body() loginUserDTO: LoginUserDto) {
    return this.authService.signIn(loginUserDTO);
  }

  @Get('private')
  @Auth(Role.USER)
  testingPrivateRoute(
    @GetUser('email') user: User
  ) {
    console.log(user)
    return 'hola mundo private'
  }

  @Get('refresh')
  @UseGuards( RefreshTokenGuard )
  refreshToken(
    @GetUser() user: any
  ) {
    return this.authService.refreshTokens(user.sub);
  }

}
