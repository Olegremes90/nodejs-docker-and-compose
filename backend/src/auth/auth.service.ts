import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  SignInUserDto,
  SigninUserResponseDto,
  UserDto,
} from '../dto/users.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(signInUserDto: SignInUserDto): Promise<UserDto | null> {
    console.log(signInUserDto);
    const user = await this.usersService.findOne(signInUserDto.username);
    if (user) {
      console.log('user', signInUserDto.password, user.password);
    }

    if (user && (await bcrypt.compare(signInUserDto.password, user.password))) {
      const { password, ...result } = user;
      console.log('result', result);
      return result;
    }
    return null;
  }
  async login(user: UserDto): Promise<SigninUserResponseDto> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async validateUserById(userId: number): Promise<UserDto | null> {
    // Используйте UsersService для поиска пользователя по ID
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      return null; // Если пользователь не найден, возвращаем null
    }
    return user; // Возвращаем пользователя, если он найден
  }
}
