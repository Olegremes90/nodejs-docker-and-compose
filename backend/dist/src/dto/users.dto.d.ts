export declare class UserDto {
    id: number;
    username: string;
    about: string;
    avatar: string;
    email?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UpdateUserDto {
    username?: string;
    about?: string;
    avatar?: string;
    email?: string;
    password?: string;
}
export declare class CreateUserDto {
    username: string;
    about?: string;
    avatar?: string;
    email: string;
    password: string;
}
export declare class SignInUserDto {
    password: string;
    username: string;
}
export declare class SigninUserResponseDto {
    access_token: string;
}
