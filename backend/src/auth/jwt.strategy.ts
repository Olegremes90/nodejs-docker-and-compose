import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error(`JWT_SECRET is not defined in the environment variables: ${process.env.JWT_SECRET}`);
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }
  async validate(payload: JwtPayload): Promise<any> {
    console.log(payload);
    const userId = parseInt(payload.sub, 10);
    const user = await this.authService.validateUserById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
