import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto, UpdateUserDto, CreateUserDto } from '../dto/users.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(username: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    findOneById(id: number): Promise<UserDto | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto>;
    findByUsername(username: string): Promise<UserDto | null>;
    findMany(query: {
        query: string;
    }): Promise<UserDto[]>;
}
