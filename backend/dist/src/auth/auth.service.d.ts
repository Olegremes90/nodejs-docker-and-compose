import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto, SigninUserResponseDto, UserDto } from '../dto/users.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(signInUserDto: SignInUserDto): Promise<UserDto | null>;
    login(user: UserDto): Promise<SigninUserResponseDto>;
    validateUserById(userId: number): Promise<UserDto | null>;
}
