import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Wishlist } from '../entity/wishlist.entity';
import { WishlistDto } from '../dto/wishlist.dto';
import { User } from '../entity/user.entity';
import { Wish } from '../entity/wish.entity';

import { CreateWishlistDto } from '../dto/wishlist.dto';
@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}
  async getAllWishlists(): Promise<WishlistDto[]> {
    const wishlistsData = await this.wishlistRepository
      .createQueryBuilder('wishlist')
      .leftJoinAndMapOne(
        'wishlist.owner',
        User,
        'wishlistUser',
        'wishlistUser.id= wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = wishlist.id')
      .leftJoinAndMapMany(
        'wishlist.items', // Виртуальное поле items для каждого вишлиста
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .select([
        'wishlist',
        'wishlistUser.id',
        'wishlistUser.username',
        'wishlistUser.about',
        'wishlistUser.avatar',
        'wishlistUser.email',
        'wishlistUser.createdAt',
        'wishlistUser.updatedAt',
        'wishItems',
      ])
      .getMany();

    return wishlistsData.map((wishlist) => {
      const wishlistsDto = new WishlistDto();
      wishlistsDto.id = wishlist.id;
      wishlistsDto.createdAt = wishlist.createdAt;
      wishlistsDto.updatedAt = wishlist.updatedAt;
      wishlistsDto.name = wishlist.name;
      wishlistsDto.image = wishlist.image;
      wishlistsDto.owner = wishlist.author ?? null;
      wishlistsDto.items = wishlist.wishes ?? null;

      return wishlistsDto;
    });
  }

  async getWishlistById(id: number): Promise<WishlistDto> {
    const wishlistsData = await this.wishlistRepository
      .createQueryBuilder('wishlist')
      .leftJoinAndMapOne(
        'wishlist.owner',
        User,
        'wishlistUser',
        'wishlistUser.id= wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = wishlist.id')
      .leftJoinAndMapMany(
        'wishlist.items',
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .where('wishlist.id = :id', { id })
      .select([
        'wishlist',
        'wishlistUser.id',
        'wishlistUser.username',
        'wishlistUser.about',
        'wishlistUser.avatar',
        'wishlistUser.email',
        'wishlistUser.createdAt',
        'wishlistUser.updatedAt',
        'wishItems',
      ])
      .getOne();

    if (!wishlistsData) {
      throw new NotFoundException('No wishlist');
    }

    const wishlistsDto = new WishlistDto();
    wishlistsDto.id = wishlistsData.id;
    wishlistsDto.createdAt = wishlistsData.createdAt;
    wishlistsDto.updatedAt = wishlistsData.updatedAt;
    wishlistsDto.name = wishlistsData.name;
    wishlistsDto.image = wishlistsData.image;
    wishlistsDto.owner = wishlistsData.author ?? null;
    wishlistsDto.items = wishlistsData.wishes ?? null;

    return wishlistsDto;
  }
  async createWishlist(
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistDto> {
    const items = await this.wishRepository.findBy({
      id: In(createWishlistDto.itemsId),
    });
    console.log(items);

    if (items.length !== createWishlistDto.itemsId.length) {
      throw new NotFoundException(`Некоторые пожелания не найдены`);
    }

    const newWishlist = this.wishlistRepository.create({
      image: createWishlistDto.image,
      name: createWishlistDto.name,
    });
    const savedWishlist = await this.wishlistRepository.save(newWishlist);
    await this.wishlistRepository
      .createQueryBuilder()
      .relation(Wishlist, 'wishes')
      .of(savedWishlist)
      .add(items);

    return this.getWishlistById(savedWishlist.id);
  }
  async updateWishlist(
    id: number,
    createWishlistDto: CreateWishlistDto,
  ): Promise<WishlistDto> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['wishes'],
    });
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with id ${id} not found`);
    }
    const items = await this.wishRepository.findBy({
      id: In(createWishlistDto.itemsId),
    });
    console.log(items);
    debugger;
    if (items.length !== createWishlistDto.itemsId.length) {
      throw new NotFoundException(`Некоторые пожелания не найдены`);
    }
    // Обновляем поля
    wishlist.name = createWishlistDto.name;
    wishlist.image = createWishlistDto.image;
    wishlist.wishes = items;
    await this.wishlistRepository.save(wishlist);
    return this.getWishlistById(id);
  }
  async removeWishlistById(id: number): Promise<WishlistDto> {
    const wishlist = await this.wishlistRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with id ${id} not found`);
    }
    const deleted = this.getWishlistById(id);
    await this.wishlistRepository.remove(wishlist);
    return deleted;
  }
  async checkAccessUpdateOrDeleteResource(
    id: number,
    userId: number,
  ): Promise<void> {
    const wishlist = await this.getWishlistById(id);
    if (!wishlist) {
      throw new NotFoundException(`Wishlist with id ${id} not found`);
    }
    if (!wishlist.owner || wishlist.owner.id != userId) {
      throw new ForbiddenException(
        'У вас нет прав для доступа к этому ресурсу',
      );
    }
  }
}
