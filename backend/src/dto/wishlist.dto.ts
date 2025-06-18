import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';
import { UserDto } from './users.dto';
import { Type } from 'class-transformer';
import { ItemWishDto } from './wish.dto';

export class WishlistDto {
  @ApiProperty({ example: 0, description: 'Unique identifier of the wishlist' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '2025-05-15T17:26:13.161Z',
    description: 'Creation date',
    format: 'date-time',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2025-05-15T17:26:13.161Z',
    description: 'Last update date',
    format: 'date-time',
  })
  @IsDateString()
  updatedAt: Date;

  @ApiProperty({ example: 'string', description: 'Name of the wishlist' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'string', description: 'Image URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    type: () => UserDto,
    description: 'Пожелание, на которое сделано предложение',
  })
  @Type(() => UserDto)
  owner: UserDto | null;

  @ApiProperty({
    type: () => ItemWishDto,
    description: 'Пожелание, на которое сделано предложение',
  })
  @Type(() => ItemWishDto)
  items?: ItemWishDto[] | null;
}
export class CreateWishlistDto {
  @ApiProperty({ example: 'string', description: 'Name of the wishlist' })
  @IsString()
  name: string;
  @ApiProperty({ example: 'string', description: 'Image URL', required: false })
  @IsString()
  @IsOptional()
  image: string;
  @ApiProperty({ example: 0, description: 'Unique identifiers of the wishes' })
  @IsNumber()
  itemsId: number[];
}
