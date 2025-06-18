import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from './users.dto';
import { OfferDto } from './offer.dto';

import { ApiProperty } from '@nestjs/swagger';

export class ItemWishDto {
  @ApiProperty({
    type: Number,
    description: 'Уникальный идентификатор пожелания',
  })
  @IsNumber()
  id: number;

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

  @ApiProperty({
    type: String,
    description: 'Название пожелания',
    minLength: 1,
    maxLength: 250,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Ссылка на пожелание',
  })
  @IsString()
  link: string;

  @ApiProperty({
    type: String,
    description: 'Изображение пожелания',
  })
  @IsString()
  image: string;

  @ApiProperty({
    type: Number,
    description: 'Цена пожелания',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Собранная сумма',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  raised: number;

  @ApiProperty({
    type: Number,
    description: 'Количество копирований',
  })
  @IsNumber()
  copied: number;

  @ApiProperty({
    type: String,
    description: 'Описание пожелания',
    minLength: 1,
    maxLength: 1024,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  description: string;
}

export class WishDto {
  @ApiProperty({
    type: Number,
    description: 'Уникальный идентификатор пожелания',
  })
  @IsNumber()
  id: number;

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

  @ApiProperty({
    type: String,
    description: 'Название пожелания',
    minLength: 1,
    maxLength: 250,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    type: String,
    description: 'Ссылка на пожелание',
  })
  @IsString()
  link: string;

  @ApiProperty({
    type: String,
    description: 'Изображение пожелания',
  })
  @IsString()
  image: string;

  @ApiProperty({
    type: Number,
    description: 'Цена пожелания',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Собранная сумма',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  raised: number;

  @ApiProperty({
    type: Number,
    description: 'Количество копирований',
  })
  @IsNumber()
  copied: number;

  @ApiProperty({
    type: String,
    description: 'Описание пожелания',
    minLength: 1,
    maxLength: 1024,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  description: string;

  @ApiProperty({
    type: () => UserDto,
    description: 'Пожелание, на которое сделано предложение',
  })
  @Type(() => UserDto)
  owner: UserDto;
  @ApiProperty({
    type: () => OfferDto,
    description: 'Пожелание, на которое сделано предложение',
  })
  @Type(() => OfferDto)
  offers?: OfferDto[];
}
export class CreateWishDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;
  @IsString()
  link: string;
  @IsString()
  image: string;
  @IsNumber()
  @Min(1)
  price: number;
  @IsString()
  description: string;
}

export class UpdateWishDto {
  @IsNumber()
  @Min(1)
  amount: number;
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;
  @IsNumber()
  itemId: number;
}
