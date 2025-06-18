import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsDateString,
  IsArray,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from './users.dto';
import { WishlistDto } from './wishlist.dto';

export class OfferDto {
  @ApiProperty({
    type: Number,
    description: 'Уникальный идентификатор предложения',
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
    description: 'Пожелание, на которое сделано предложение',
  })
  @IsString()
  item: string | null;

  @ApiProperty({ type: Number, description: 'Сумма предложения' })
  @IsNumber()
  amount: number;

  @ApiProperty({ type: Boolean, description: 'Статус видимости предложения' })
  @IsBoolean()
  hidden: boolean;

  @ApiProperty({
    type: () => UserDto,
    description: 'Пользователь, сделавший предложение',
  })
  @Type(() => UserDto)
  user?: UserDto | null;

  @IsArray()
  @IsString({ each: true })
  wishes?: string[];

  @IsArray()
  @IsString({ each: true })
  offers?: string[];

  @ApiProperty({
    type: () => WishlistDto,
    description: 'Пользователь, сделавший предложение',
  })
  @Type(() => WishlistDto)
  wishlists?: WishlistDto[];
}

export class CreateOfferDto {
  @ApiProperty({ type: Boolean, description: 'Статус видимости предложения' })
  @IsBoolean()
  hidden?: boolean;
  @ApiProperty({ type: Number, description: 'Сумма предложения' })
  @IsNumber()
  amount: number;
  @ApiProperty({ type: Number, description: 'Ссылка на продукт' })
  @IsNumber()
  itemId: number;
}
