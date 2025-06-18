import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto, UserDto } from '../dto/users.dto';
export declare class AuthController {
    private authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<UserDto>;
    login(req: any): Promise<import("../dto/users.dto").SigninUserResponseDto>;
}
