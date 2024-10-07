import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAnonymDto } from '../user/dto/create-anonym.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  // async CreateSessionAnonym(anonymDto: CreateAnonymDto) {
  //   return this.userService.createAnonym(anonymDto);
  // }

  async validateLogin(email: string, password: string): Promise<any> {
    const user = await this.userService.findByMail(email, true);

    if (!user || !user.password || !password) {
      return null;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (passwordIsValid) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  async createToken(user: any) {
    const payload = { anonym: true, sub: user._id };

    return this.jwtService.sign(payload);
  }

  async checkMail(email: string) {
    return (await this.userService.findByMail(email)) === null;
  }
}
