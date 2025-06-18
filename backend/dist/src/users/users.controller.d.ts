import { UsersService } from './users.service';
import { UserDto, UpdateUserDto } from '../dto/users.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getUserMe(req: any): Promise<UserDto | null>;
    updateUser(req: any, updateUserDto: UpdateUserDto): Promise<UserDto>;
    findMany(body: {
        query: string;
    }): Promise<UserDto[]>;
    getUserByUsername(username: string): Promise<UserDto | null>;
}
