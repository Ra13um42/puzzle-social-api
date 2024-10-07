import {
  Body,
  Query,
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  UnauthorizedException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { LoginUserDto } from '../user/dto/login-user.dto';
import { Public } from './decorator/public.decorator';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    const user = await this.authService.validateLogin(userDto.email, userDto.password);

    if (!user) {
      throw new UnauthorizedException();
    }
 
    const access_token = await this.authService.createToken(user);
    return { user: user, access_token };
  }

  @Public()
  @Post('signup')
  async register(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signup(userDto);
    const access_token = await this.authService.createToken(user);

    return { user, access_token };
  }

  @Get('check')
  async check(@Request() req) {
    if (req.user) {
      const user = await this.userService.findById(req.user.userId);
      return user;
    } else {
      return null;
      // throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
