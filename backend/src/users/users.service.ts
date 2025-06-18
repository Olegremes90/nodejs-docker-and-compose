import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserDto, UpdateUserDto, CreateUserDto } from '../dto/users.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    if (!createUserDto.email) {
      throw new BadRequestException('Email is required');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
      username: createUserDto.username,
      avatar: createUserDto.avatar,
      about: createUserDto.about,
    });

    return this.usersRepository.save(user);
  }

  async findOneById(id: number): Promise<UserDto | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }
    Object.assign(user, updateUserDto);
    const saved_user = await this.usersRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDto } = saved_user;
    return userDto;
  }
  async findByUsername(username: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'email',
        'about',
        'avatar',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async findMany(query: { query: string }): Promise<UserDto[]> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :query', { query: `%${query.query}%` })
      .orWhere('user.email ILIKE :query', { query: `%${query.query}%` })
      .getMany();
    if (!users || users.length === 0) {
      throw new NotFoundException('Пользователи с таким критерием не найдены');
    }

    return users;
  }
}
