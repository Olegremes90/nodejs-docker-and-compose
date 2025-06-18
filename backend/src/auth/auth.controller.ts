import { Controller, Post, UseGuards, Request, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto, SignInUserDto, UserDto } from '../dto/users.dto';
import { SensitiveDataUsersInterceptor } from '../interceptors/sensitive-data.interceptors';
import { CustomRequest } from '../interfaces/user.interface';

@UseInterceptors(SensitiveDataUsersInterceptor)
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }
  @UseGuards(LocalGuard)
  @Post('signin')
  async login(@Request() req) {
    console.log('req', req.user);
    return this.authService.login(req.user);
  }
}
