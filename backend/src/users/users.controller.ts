import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto, UpdateUserDto } from '../dto/users.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SensitiveDataUsersInterceptor } from '../interceptors/sensitive-data.interceptors';

@UseInterceptors(SensitiveDataUsersInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserMe(@Request() req): Promise<UserDto | null> {
    return this.userService.findByUsername(req.user.username);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateUser(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(req.user.id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findMany(@Body() body: { query: string }): Promise<UserDto[]> {
    return this.userService.findMany(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto | null> {
    return this.userService.findByUsername(username);
  }
}
