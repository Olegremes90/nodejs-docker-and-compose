import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Wish } from '../entity/wish.entity';
import { Offer } from '../entity/offer.entity';
import { Wishlist } from '../entity/wishlist.entity';
import { WishDto, CreateWishDto, ItemWishDto } from '../dto/wish.dto';

@Injectable()
export class WishService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserWishes(username: string): Promise<WishDto[]> {
    const wishesData = await this.wishRepository
      .createQueryBuilder('wish')
      .innerJoinAndSelect('wish.owner', 'user')
      .leftJoinAndMapMany(
        'wish.offers',
        Offer,
        'offer',
        'offer.wishId = wish.id',
      )
      .leftJoinAndMapOne(
        'offer.item',
        Wish,
        'offerWish',
        'offerWish.id = offer.wishId',
      )
      .leftJoinAndMapOne(
        'offer.user',
        User,
        'offerUser',
        'offer.userId = offerUser.id',
      )
      .leftJoinAndMapMany(
        'offerUser.wishes',
        Wish,
        'userWish',
        'userWish.ownerId = offerUser.id',
      )
      .leftJoin('offer', 'o', 'o.userId = offerUser.id')
      .leftJoinAndMapMany(
        'offerUser.offers',
        Wish,
        'userWishOffer',
        'userWishOffer.id = o.wishId',
      )
      .leftJoinAndMapMany(
        'offerUser.wishlists',
        Wishlist,
        'Wishlist',
        'Wishlist.authorId = offerUser.id',
      )
      .leftJoinAndMapOne(
        'Wishlist.owner',
        User,
        'WishlistOwner',
        'WishlistOwner.id = Wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
      .leftJoinAndMapMany(
        'Wishlist.items',
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .where('user.username = :username', { username })
      .getMany();

    return mapWishToDto(wishesData);
  }

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishRepository.create(createWishDto);
    return await this.wishRepository.save(wish);
  }

  async getTopWish(): Promise<WishDto[]> {
    const wishesData = await this.wishRepository
      .createQueryBuilder('wish')
      .leftJoinAndSelect('wish.owner', 'user')
      .leftJoinAndMapMany(
        'wish.offers',
        Offer,
        'offer',
        'offer.wishId = wish.id',
      )
      .leftJoinAndMapOne(
        'offer.item',
        Wish,
        'offerWish',
        'offerWish.id = offer.wishId',
      )
      .leftJoinAndMapOne(
        'offer.user',
        User,
        'offerUser',
        'offer.userId = offerUser.id',
      )
      .leftJoinAndMapMany(
        'offerUser.wishes',
        Wish,
        'userWish',
        'userWish.ownerId = offerUser.id',
      )
      .leftJoin('offer', 'o', 'o.userId = offerUser.id')
      .leftJoinAndMapMany(
        'offerUser.offers',
        Wish,
        'userWishOffer',
        'userWishOffer.id = o.wishId',
      )
      .leftJoinAndMapMany(
        'offerUser.wishlists',
        Wishlist,
        'Wishlist',
        'Wishlist.authorId = offerUser.id',
      )
      .leftJoinAndMapOne(
        'Wishlist.owner',
        User,
        'WishlistOwner',
        'WishlistOwner.id = Wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
      .leftJoinAndMapMany(
        'Wishlist.items',
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .select([
        'wish',
        'user.id',
        'user.username',
        'user.about',
        'user.avatar',
        'user.email',
        'user.createdAt',
        'user.updatedAt',
        'offer',
        'offerWish',
        'offerUser.id',
        'offerUser.username',
        'offerUser.about',
        'offerUser.avatar',
        'offerUser.email',
        'offerUser.createdAt',
        'offerUser.updatedAt',
        'Wishlist',
        'WishlistOwner.id',
        'WishlistOwner.username',
        'WishlistOwner.about',
        'WishlistOwner.avatar',
        'WishlistOwner.email',
        'WishlistOwner.createdAt',
        'WishlistOwner.updatedAt',
      ])
      .orderBy('wish.copied::INTEGER', 'DESC')
      .take(10)
      .getMany();
    console.log(wishesData);

    return mapWishToDto(wishesData);
  }

  async getLastWish(orderby: string): Promise<WishDto[]> {
    const validOrderBy =
      orderby === 'ASC' || orderby === 'DESC' ? orderby : 'ASC';
    const wishesData = await this.wishRepository
      .createQueryBuilder('wish')
      .leftJoinAndSelect('wish.owner', 'user')
      .leftJoinAndMapMany(
        'wish.offers',
        Offer,
        'offer',
        'offer.wishId = wish.id',
      )
      .leftJoinAndMapOne(
        'offer.item',
        Wish,
        'offerWish',
        'offerWish.id = offer.wishId',
      )
      .leftJoinAndMapOne(
        'offer.user',
        User,
        'offerUser',
        'offer.userId = offerUser.id',
      )
      .leftJoinAndMapMany(
        'offerUser.wishes',
        Wish,
        'userWish',
        'userWish.ownerId = offerUser.id',
      )
      .leftJoin('offer', 'o', 'o.userId = offerUser.id')
      .leftJoinAndMapMany(
        'offerUser.offers',
        Wish,
        'userWishOffer',
        'userWishOffer.id = o.wishId',
      )
      .leftJoinAndMapMany(
        'offerUser.wishlists',
        Wishlist,
        'Wishlist',
        'Wishlist.authorId = offerUser.id',
      )
      .leftJoinAndMapOne(
        'Wishlist.owner',
        User,
        'WishlistOwner',
        'WishlistOwner.id = Wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
      .leftJoinAndMapMany(
        'Wishlist.items',
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .select([
        'wish',
        'user.id',
        'user.username',
        'user.about',
        'user.avatar',
        'user.email',
        'user.createdAt',
        'user.updatedAt',

        'offer',
        'offerWish',
        'offerUser.id',
        'offerUser.username',
        'offerUser.about',
        'offerUser.avatar',
        'offerUser.email',
        'offerUser.createdAt',
        'offerUser.updatedAt',
        'Wishlist',
        'WishlistOwner.id',
        'WishlistOwner.username',
        'WishlistOwner.about',
        'WishlistOwner.avatar',
        'WishlistOwner.email',
        'WishlistOwner.createdAt',
        'WishlistOwner.updatedAt',
      ])
      .orderBy('wish.createdAt', validOrderBy)
      .take(40)
      .getMany();

    return mapWishToDto(wishesData);
  }

  async getWishById(id: number): Promise<WishDto> {
    const wishesData = await this.wishRepository
      .createQueryBuilder('wish')
      .leftJoinAndSelect('wish.owner', 'user')
      .leftJoinAndMapMany(
        'wish.offers',
        Offer,
        'offer',
        'offer.wishId = wish.id',
      )
      .leftJoinAndMapOne(
        'offer.item',
        Wish,
        'offerWish',
        'offerWish.id = offer.wishId',
      )
      .leftJoinAndMapOne(
        'offer.user',
        User,
        'offerUser',
        'offer.userId = offerUser.id',
      )
      .leftJoinAndMapMany(
        'offerUser.wishes',
        Wish,
        'userWish',
        'userWish.ownerId = offerUser.id',
      )
      .leftJoin('offer', 'o', 'o.userId = offerUser.id')
      .leftJoinAndMapMany(
        'offerUser.offers',
        Wish,
        'userWishOffer',
        'userWishOffer.id = o.wishId',
      )
      .leftJoinAndMapMany(
        'offerUser.wishlists',
        Wishlist,
        'Wishlist',
        'Wishlist.authorId = offerUser.id',
      )
      .leftJoinAndMapOne(
        'Wishlist.owner',
        User,
        'WishlistOwner',
        'WishlistOwner.id = Wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
      .leftJoinAndMapMany(
        'Wishlist.items',
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .where('wish.id = :id', { id })
      .select([
        'wish',
        'user.id',
        'user.username',
        'user.about',
        'user.avatar',
        'user.email',
        'user.createdAt',
        'user.updatedAt',
        'offer',
        'offerWish',
        'offerUser.id',
        'offerUser.username',
        'offerUser.about',
        'offerUser.avatar',
        'offerUser.email',
        'offerUser.createdAt',
        'offerUser.updatedAt',
        'Wishlist',
        'WishlistOwner.id',
        'WishlistOwner.username',
        'WishlistOwner.about',
        'WishlistOwner.avatar',
        'WishlistOwner.email',
        'WishlistOwner.createdAt',
        'WishlistOwner.updatedAt',
      ])
      .getOne();

    if (!wishesData) {
      throw new NotFoundException('Wish not found');
    }

    const wishDto = mapSingleWishToDto(wishesData);
    return wishDto;
  }

  async updateWish(id: number, createWishDto: CreateWishDto): Promise<WishDto> {
    const wishesData = await this.wishRepository
      .createQueryBuilder('wish')
      .leftJoinAndSelect('wish.owner', 'user')
      .leftJoinAndMapMany(
        'wish.offers',
        Offer,
        'offer',
        'offer.wishId = wish.id',
      )
      .leftJoinAndMapOne(
        'offer.item',
        Wish,
        'offerWish',
        'offerWish.id = offer.wishId',
      )
      .leftJoinAndMapOne(
        'offer.user',
        User,
        'offerUser',
        'offer.userId = offerUser.id',
      )
      .leftJoinAndMapMany(
        'offerUser.wishes',
        Wish,
        'userWish',
        'userWish.ownerId = offerUser.id',
      )
      .leftJoin('offer', 'o', 'o.userId = offerUser.id')
      .leftJoinAndMapMany(
        'offerUser.offers',
        Wish,
        'userWishOffer',
        'userWishOffer.id = o.wishId',
      )
      .leftJoinAndMapMany(
        'offerUser.wishlists',
        Wishlist,
        'Wishlist',
        'Wishlist.authorId = offerUser.id',
      )
      .leftJoinAndMapOne(
        'Wishlist.owner',
        User,
        'WishlistOwner',
        'WishlistOwner.id = Wishlist.authorId',
      )
      .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
      .leftJoinAndMapMany(
        'Wishlist.items',
        Wish,
        'wishItems',
        'wishItems.id = ww.wishId',
      )
      .where('wish.id = :id', { id })
      .select([
        'wish',
        'user.id',
        'user.username',
        'user.about',
        'user.avatar',
        'user.email',
        'user.createdAt',
        'user.updatedAt',

        'offer',
        'offerWish',
        'offerUser.id',
        'offerUser.username',
        'offerUser.about',
        'offerUser.avatar',
        'offerUser.email',
        'offerUser.createdAt',
        'offerUser.updatedAt',
        'Wishlist',
        'WishlistOwner.id',
        'WishlistOwner.username',
        'WishlistOwner.about',
        'WishlistOwner.avatar',
        'WishlistOwner.email',
        'WishlistOwner.createdAt',
        'WishlistOwner.updatedAt',
      ])
      .getOne();

    if (!wishesData) {
      throw new NotFoundException('Wish not found');
    }

    const wishDto = mapSingleWishToDto(wishesData);

    Object.assign(wishDto, createWishDto);

    return this.wishRepository.save(wishDto);
  }

  async remove(id: number): Promise<WishDto> {
    const deleted_wish = await this.getWishById(id);
    if (!deleted_wish) {
      throw new NotFoundException(`Wish with id ${id} not found`);
    }
    if (deleted_wish.raised > 0) {
      throw new ForbiddenException(
        `Невозможно удалить товар, на который уже собраны деньги`,
      );
    }
    return this.wishRepository
      .delete(id)
      .then(() => {
        return deleted_wish;
      })
      .catch(() => {
        throw new InternalServerErrorException(
          `Failed to delete wish with id ${id}`,
        );
      });
  }

  async copy(userId: number, id: number): Promise<ItemWishDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    console.log('copy', user);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const originalWish = await this.wishRepository.findOne({ where: { id } });
    console.log('orriginalwish', originalWish);
    if (!originalWish) {
      throw new NotFoundException(`Wish with id ${id} not found`);
    }
    const copiedCount =
      typeof originalWish.copied === 'string'
        ? parseInt(originalWish.copied, 10)
        : originalWish.copied;
    originalWish.copied = copiedCount + 1;
    await this.wishRepository.save(originalWish);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt, updatedAt, raised, ...wishData } = originalWish;

    const newWish: WishDto = this.wishRepository.create({
      ...wishData,
      copied: 0,
      owner: user,
    });
    console.log('newWish', newWish);
    await this.wishRepository.save(newWish);
    return this.getWishById(newWish.id);
  }

  async checkAccessUpdateOrDeleteResource(
    id: number,
    userId: number,
  ): Promise<void> {
    const wishesData = await this.getWishById(id);

    if (wishesData.owner.id != userId) {
      throw new ForbiddenException(
        'У вас нет прав для доступа к этому ресурсу',
      );
    }
  }

  async canUpdatePrice(
    id: number,
    createWishDto: CreateWishDto,
  ): Promise<void> {
    const wishesData = await this.getWishById(id);
    // Проверка бизнес-логики
    if (wishesData && Array.isArray(wishesData.offers) && createWishDto.price) {
      for (const wish of wishesData['offers']) {
        if (wish.amount > 0 && createWishDto.price !== wishesData.price) {
          throw new ForbiddenException(
            'Недопустимо изменение цены, есть желающие скинуться',
          );
        }
      }
    }
  }

  async canDelete(id: number): Promise<void> {
    const deleted_wish = await this.getWishById(id);
    if (!deleted_wish) {
      throw new NotFoundException(`Wish with id ${id} not found`);
    }
    if (deleted_wish.raised > 0) {
      throw new ForbiddenException(
        `Невозможно удалить товар, на который уже собраны деньги`,
      );
    }
  }
}

function mapSingleWishToDto(wish: Wish): WishDto {
  const offers =
    wish['offers']?.map((offer) => {
      if (offer.item) offer.item = offer.item.name;
      if (offer.user?.wishes)
        offer.user.wishes = offer.user.wishes.map((wish) => wish.name);
      if (offer.user?.offers)
        offer.user.offers = offer.user.offers.map((offer) => offer.name);
      return offer;
    }) || [];

  const wishDto = new WishDto();
  wishDto.id = wish.id;
  wishDto.createdAt = wish.createdAt;
  wishDto.updatedAt = wish.updatedAt;
  wishDto.name = wish.name;
  wishDto.image = wish.image;
  wishDto.price = wish.price;
  wishDto.raised = wish.raised;
  wishDto.copied = wish.copied;
  wishDto.owner = wish.owner;
  wishDto.description = wish.description;
  wishDto.offers = offers;

  return wishDto;
}

function mapWishToDto(wishesData: Wish[]): WishDto[] {
  return wishesData.map((wish) => {
    const offers =
      wish['offers']?.map((offer) => {
        if (offer.item) offer.item = offer.item.name;
        if (offer.user?.wishes)
          offer.user.wishes = offer.user.wishes.map((wish) => wish.name);
        if (offer.user?.offers)
          offer.user.offers = offer.user.offers.map((offer) => offer.name);
        return offer;
      }) || [];
    const wishDto = new WishDto();
    wishDto.id = wish.id;
    wishDto.createdAt = wish.createdAt;
    wishDto.updatedAt = wish.updatedAt;
    wishDto.name = wish.name;
    wishDto.image = wish.image;
    wishDto.price = wish.price;
    wishDto.raised = wish.raised;
    wishDto.copied = wish.copied;
    wishDto.owner = wish.owner;
    wishDto.description = wish.description;
    wishDto.offers = offers;
    return wishDto;
  });
}
