import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entity/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto, OfferDto } from '../dto/offer.dto';
import { User } from '../entity/user.entity';
import { Wish } from '../entity/wish.entity';
import { Wishlist } from '../entity/wishlist.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createOffer(
    id: number,
    createOfferDto: CreateOfferDto,
  ): Promise<OfferDto> {
    const item = await this.wishRepository.findOne({
      where: { id: createOfferDto.itemId },
      relations: ['owner'],
    });
    const user = await this.userRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(
        `Wish with id ${createOfferDto.itemId} not found`,
      );
    }
    if (!user) {
      throw new NotFoundException(`User  with id ${id} not found`);
    }

    const offer = this.offerRepository.create({
      amount: createOfferDto.amount,
      hidden: createOfferDto.hidden ?? false,
      wish: item,
      user: user,
    });
    console.log(typeof item.raised);
    item.raised = (Number(item.raised) || 0) + createOfferDto.amount;
    await this.wishRepository.save(item);
    const savedOffer = await this.offerRepository.save(offer);
    return this.getOfferById(savedOffer.id);
  }
  async getAllOffers(): Promise<OfferDto[]> {
    const offersData = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndMapOne(
        'offer.wish',
        Wish,
        'offerWish',
        'offer.wishId = offerWish.id',
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
      .getMany();

    return offersData.map((offer) => {
      if (offer.user && offer.user['wishes']) {
        offer.user['wishes'] = offer.user['wishes'].map((wish) => wish.name);
      }
      if (offer.user && offer.user['offers']) {
        offer.user['offers'] = offer.user['offers'].map((offer) => offer.name);
      }
      const offerDto = new OfferDto();
      offerDto.id = offer.id;
      offerDto.createdAt = offer.createdAt;
      offerDto.updatedAt = offer.updatedAt;
      offerDto.item = offer.wish ? offer.wish.name : null;
      offerDto.amount = offer.amount;
      offerDto.hidden = offer.hidden;
      offerDto.user = offer.user;
      if (offer.user) {
        const { password, ...userDetails } = offer.user;
        offerDto.user = {
          ...userDetails,
        };
      } else {
        offerDto.user = null;
      }
      return offerDto;
    });
  }

  async getOfferById(id: number): Promise<OfferDto> {
    const offersData = await this.offerRepository
      .createQueryBuilder('offer')
      .leftJoinAndMapOne(
        'offer.wish',
        Wish,
        'offerWish',
        'offer.wishId = offerWish.id',
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
      .where('offer.id = :id', { id })
      .getOne();

    if (offersData) {
      if (offersData.user && offersData.user['wishes']) {
        offersData.user['wishes'] = offersData.user['wishes'].map(
          (wish) => wish.name,
        );
      }
      if (offersData.user && offersData.user['offers']) {
        offersData.user['offers'] = offersData.user['offers'].map(
          (offer) => offer.name,
        );
      }
      const offerDto = new OfferDto();
      offerDto.id = offersData.id;
      offerDto.createdAt = offersData.createdAt;
      offerDto.updatedAt = offersData.updatedAt;
      offerDto.item = offersData.wish ? offersData.wish.name : null;
      offerDto.amount = offersData.amount;
      offerDto.hidden = offersData.hidden;
      offerDto.user = offersData.user;
      if (offersData.user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userDetails } = offersData.user;
        offerDto.user = {
          ...userDetails,
        };
      } else {
        offerDto.user = null;
      }
      return offerDto;
    } else {
      return new OfferDto();
    }
  }
  async canCreateOffer(
    id: number,
    createOfferDto: CreateOfferDto,
  ): Promise<void> {
    const item = await this.wishRepository.findOne({
      where: { id: createOfferDto.itemId },
      relations: ['owner'],
    });
    if (item && item.owner && item.owner.id === id) {
      throw new ForbiddenException(
        'Вы не можете платить за собственный подарок',
      );
    }
    if (item && createOfferDto.amount && item.raised == item.price) {
      throw new ForbiddenException('Деньги на подарок уже собраны');
    }
    if (
      item &&
      createOfferDto.amount &&
      Number(item.raised) + createOfferDto.amount > item.price
    ) {
      throw new ForbiddenException('Оплата превысет сумму подарка');
    }
  }
}
