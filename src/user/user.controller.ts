import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { Public } from '../auth/decorator/public.decorator';
import { SetNameDto } from './dto/set-name.dto';
import { SetAboutDto } from './dto/set-about.dto';

import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  async findAll(@Query('nearId') nearId: string): Promise<User[]> {
    if (nearId) {
      // return this.userService.findNear(nearId);
      return this.userService.findAll();
    }
    return this.userService.findAll();
  }

  @Public()
  @Get('count')
  async count(): Promise<number> {
    return (await this.userService.findAll()).length;
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }

  @Put(':id/name')
  async setName(@Request() req, @Body() setNameDto: SetNameDto) {
    this.userService.setName(req.user.userId, setNameDto.name);
  }

  @Put(':id/about')
  async setAbout(@Request() req, @Body() setAboutDto: SetAboutDto) {
    this.userService.setAbout(req.user.userId, setAboutDto.about);
  }

  // @Put(':id/location')
  // async setLocation(@Query('id') locationId: string, @Request() req) {
  //   this.userService.setLocation(req.user.userId, locationId);
  // }

  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: 'static/photos/',
    }),
  )
  async setPhoto(@Request() req, @UploadedFile() file: Express.Multer.File) {
    await this.userService.setPhoto(req.user.userId, file.filename);
    return file.filename;
  }
}
