import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { SignInUserDto, UserDto } from '../dto/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  async validate(username: string, password: string): Promise<UserDto | null> {
    const signInUserDto: SignInUserDto = { username, password };

    const user = await this.authService.validateUser(signInUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
