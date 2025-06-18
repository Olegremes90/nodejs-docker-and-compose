"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const wish_entity_1 = require("../entity/wish.entity");
const offer_entity_1 = require("../entity/offer.entity");
const wishlist_entity_1 = require("../entity/wishlist.entity");
const wish_dto_1 = require("../dto/wish.dto");
let WishService = class WishService {
    wishRepository;
    usersRepository;
    constructor(wishRepository, usersRepository) {
        this.wishRepository = wishRepository;
        this.usersRepository = usersRepository;
    }
    async getUserWishes(username) {
        const wishesData = await this.wishRepository
            .createQueryBuilder('wish')
            .innerJoinAndSelect('wish.owner', 'user')
            .leftJoinAndMapMany('wish.offers', offer_entity_1.Offer, 'offer', 'offer.wishId = wish.id')
            .leftJoinAndMapOne('offer.item', wish_entity_1.Wish, 'offerWish', 'offerWish.id = offer.wishId')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
            .where('user.username = :username', { username })
            .getMany();
        return mapWishToDto(wishesData);
    }
    async create(createWishDto) {
        const wish = this.wishRepository.create(createWishDto);
        return await this.wishRepository.save(wish);
    }
    async getTopWish() {
        const wishesData = await this.wishRepository
            .createQueryBuilder('wish')
            .leftJoinAndSelect('wish.owner', 'user')
            .leftJoinAndMapMany('wish.offers', offer_entity_1.Offer, 'offer', 'offer.wishId = wish.id')
            .leftJoinAndMapOne('offer.item', wish_entity_1.Wish, 'offerWish', 'offerWish.id = offer.wishId')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
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
    async getLastWish(orderby) {
        const validOrderBy = orderby === 'ASC' || orderby === 'DESC' ? orderby : 'ASC';
        const wishesData = await this.wishRepository
            .createQueryBuilder('wish')
            .leftJoinAndSelect('wish.owner', 'user')
            .leftJoinAndMapMany('wish.offers', offer_entity_1.Offer, 'offer', 'offer.wishId = wish.id')
            .leftJoinAndMapOne('offer.item', wish_entity_1.Wish, 'offerWish', 'offerWish.id = offer.wishId')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
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
    async getWishById(id) {
        const wishesData = await this.wishRepository
            .createQueryBuilder('wish')
            .leftJoinAndSelect('wish.owner', 'user')
            .leftJoinAndMapMany('wish.offers', offer_entity_1.Offer, 'offer', 'offer.wishId = wish.id')
            .leftJoinAndMapOne('offer.item', wish_entity_1.Wish, 'offerWish', 'offerWish.id = offer.wishId')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
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
            throw new common_1.NotFoundException('Wish not found');
        }
        const wishDto = mapSingleWishToDto(wishesData);
        return wishDto;
    }
    async updateWish(id, createWishDto) {
        const wishesData = await this.wishRepository
            .createQueryBuilder('wish')
            .leftJoinAndSelect('wish.owner', 'user')
            .leftJoinAndMapMany('wish.offers', offer_entity_1.Offer, 'offer', 'offer.wishId = wish.id')
            .leftJoinAndMapOne('offer.item', wish_entity_1.Wish, 'offerWish', 'offerWish.id = offer.wishId')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
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
            throw new common_1.NotFoundException('Wish not found');
        }
        const wishDto = mapSingleWishToDto(wishesData);
        Object.assign(wishDto, createWishDto);
        return this.wishRepository.save(wishDto);
    }
    async remove(id) {
        const deleted_wish = await this.getWishById(id);
        if (!deleted_wish) {
            throw new common_1.NotFoundException(`Wish with id ${id} not found`);
        }
        if (deleted_wish.raised > 0) {
            throw new common_1.ForbiddenException(`Невозможно удалить товар, на который уже собраны деньги`);
        }
        return this.wishRepository
            .delete(id)
            .then(() => {
            return deleted_wish;
        })
            .catch(() => {
            throw new common_1.InternalServerErrorException(`Failed to delete wish with id ${id}`);
        });
    }
    async copy(userId, id) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        console.log('copy', user);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        const originalWish = await this.wishRepository.findOne({ where: { id } });
        console.log('orriginalwish', originalWish);
        if (!originalWish) {
            throw new common_1.NotFoundException(`Wish with id ${id} not found`);
        }
        const copiedCount = typeof originalWish.copied === 'string'
            ? parseInt(originalWish.copied, 10)
            : originalWish.copied;
        originalWish.copied = copiedCount + 1;
        await this.wishRepository.save(originalWish);
        const { id: _id, createdAt, updatedAt, raised, ...wishData } = originalWish;
        const newWish = this.wishRepository.create({
            ...wishData,
            copied: 0,
            owner: user,
        });
        console.log('newWish', newWish);
        await this.wishRepository.save(newWish);
        return this.getWishById(newWish.id);
    }
    async checkAccessUpdateOrDeleteResource(id, userId) {
        const wishesData = await this.getWishById(id);
        if (wishesData.owner.id != userId) {
            throw new common_1.ForbiddenException('У вас нет прав для доступа к этому ресурсу');
        }
    }
    async canUpdatePrice(id, createWishDto) {
        const wishesData = await this.getWishById(id);
        if (wishesData && Array.isArray(wishesData.offers) && createWishDto.price) {
            for (const wish of wishesData['offers']) {
                if (wish.amount > 0 && createWishDto.price !== wishesData.price) {
                    throw new common_1.ForbiddenException('Недопустимо изменение цены, есть желающие скинуться');
                }
            }
        }
    }
    async canDelete(id) {
        const deleted_wish = await this.getWishById(id);
        if (!deleted_wish) {
            throw new common_1.NotFoundException(`Wish with id ${id} not found`);
        }
        if (deleted_wish.raised > 0) {
            throw new common_1.ForbiddenException(`Невозможно удалить товар, на который уже собраны деньги`);
        }
    }
};
exports.WishService = WishService;
exports.WishService = WishService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(wish_entity_1.Wish)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], WishService);
function mapSingleWishToDto(wish) {
    const offers = wish['offers']?.map((offer) => {
        if (offer.item)
            offer.item = offer.item.name;
        if (offer.user?.wishes)
            offer.user.wishes = offer.user.wishes.map((wish) => wish.name);
        if (offer.user?.offers)
            offer.user.offers = offer.user.offers.map((offer) => offer.name);
        return offer;
    }) || [];
    const wishDto = new wish_dto_1.WishDto();
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
function mapWishToDto(wishesData) {
    return wishesData.map((wish) => {
        const offers = wish['offers']?.map((offer) => {
            if (offer.item)
                offer.item = offer.item.name;
            if (offer.user?.wishes)
                offer.user.wishes = offer.user.wishes.map((wish) => wish.name);
            if (offer.user?.offers)
                offer.user.offers = offer.user.offers.map((offer) => offer.name);
            return offer;
        }) || [];
        const wishDto = new wish_dto_1.WishDto();
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
//# sourceMappingURL=wish.service.js.map