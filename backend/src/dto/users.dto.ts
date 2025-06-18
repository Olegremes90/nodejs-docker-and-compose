import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsEmail,
  IsDateString,
  MinLength,
  MaxLength,
  IsStrongPassword,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: Number,
    description: 'Уникальный идентификатор пользователя',
    example: 5,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Имя пользователя',
    minLength: 1,
    maxLength: 64,
    example: 'user',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @ApiProperty({
    type: String,
    description: 'Описание профиля',
    minLength: 1,
    maxLength: 200,
    example: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  about: string;

  @ApiProperty({
    type: String,
    description: 'URL аватара',
    example: 'https://i.pravatar.cc/300',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    type: String,
    description: 'Email пользователя',
    example: 'user@yandex.ru',
  })
  @IsEmail()
  email?: string;
  @ApiProperty({
    type: String,
    description: 'Password пользователя',
    example: '12345',
  })
  @IsStrongPassword()
  password?: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Дата создания',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    description: 'Дата последнего обновления',
  })
  @IsDateString()
  updatedAt: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username?: string; // Поле для обновления имени пользователя
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  about?: string; // Поле для обновления информации о пользователе
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string; // Поле для обновления URL аватара
  @IsOptional()
  @IsEmail()
  email?: string; // Поле для обновления адреса электронной почты
  @IsOptional()
  @IsString()
  @MinLength(2)
  password?: string; // Поле для обновления пароля
}

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  about?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  password: string;
}
export class SignInUserDto {
  @IsString()
  @MinLength(2)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;
}
export class SigninUserResponseDto {
  @ApiProperty({
    type: String,
    description: 'JWT-токен',
  })
  access_token: string;
}
