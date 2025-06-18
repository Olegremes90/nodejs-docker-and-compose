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
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("../entity/offer.entity");
const typeorm_2 = require("typeorm");
const offer_dto_1 = require("../dto/offer.dto");
const user_entity_1 = require("../entity/user.entity");
const wish_entity_1 = require("../entity/wish.entity");
const wishlist_entity_1 = require("../entity/wishlist.entity");
let OfferService = class OfferService {
    offerRepository;
    wishRepository;
    userRepository;
    constructor(offerRepository, wishRepository, userRepository) {
        this.offerRepository = offerRepository;
        this.wishRepository = wishRepository;
        this.userRepository = userRepository;
    }
    async createOffer(id, createOfferDto) {
        const item = await this.wishRepository.findOne({
            where: { id: createOfferDto.itemId },
            relations: ['owner'],
        });
        const user = await this.userRepository.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException(`Wish with id ${createOfferDto.itemId} not found`);
        }
        if (!user) {
            throw new common_1.NotFoundException(`User  with id ${id} not found`);
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
    async getAllOffers() {
        const offersData = await this.offerRepository
            .createQueryBuilder('offer')
            .leftJoinAndMapOne('offer.wish', wish_entity_1.Wish, 'offerWish', 'offer.wishId = offerWish.id')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
            .getMany();
        return offersData.map((offer) => {
            if (offer.user && offer.user['wishes']) {
                offer.user['wishes'] = offer.user['wishes'].map((wish) => wish.name);
            }
            if (offer.user && offer.user['offers']) {
                offer.user['offers'] = offer.user['offers'].map((offer) => offer.name);
            }
            const offerDto = new offer_dto_1.OfferDto();
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
            }
            else {
                offerDto.user = null;
            }
            return offerDto;
        });
    }
    async getOfferById(id) {
        const offersData = await this.offerRepository
            .createQueryBuilder('offer')
            .leftJoinAndMapOne('offer.wish', wish_entity_1.Wish, 'offerWish', 'offer.wishId = offerWish.id')
            .leftJoinAndMapOne('offer.user', user_entity_1.User, 'offerUser', 'offer.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.wishes', wish_entity_1.Wish, 'userWish', 'userWish.ownerId = offerUser.id')
            .leftJoin('offer', 'o', 'o.userId = offerUser.id')
            .leftJoinAndMapMany('offerUser.offers', wish_entity_1.Wish, 'userWishOffer', 'userWishOffer.id = o.wishId')
            .leftJoinAndMapMany('offerUser.wishlists', wishlist_entity_1.Wishlist, 'Wishlist', 'Wishlist.authorId = offerUser.id')
            .leftJoinAndMapOne('Wishlist.owner', user_entity_1.User, 'WishlistOwner', 'WishlistOwner.id = Wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = Wishlist.id')
            .leftJoinAndMapMany('Wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
            .where('offer.id = :id', { id })
            .getOne();
        if (offersData) {
            if (offersData.user && offersData.user['wishes']) {
                offersData.user['wishes'] = offersData.user['wishes'].map((wish) => wish.name);
            }
            if (offersData.user && offersData.user['offers']) {
                offersData.user['offers'] = offersData.user['offers'].map((offer) => offer.name);
            }
            const offerDto = new offer_dto_1.OfferDto();
            offerDto.id = offersData.id;
            offerDto.createdAt = offersData.createdAt;
            offerDto.updatedAt = offersData.updatedAt;
            offerDto.item = offersData.wish ? offersData.wish.name : null;
            offerDto.amount = offersData.amount;
            offerDto.hidden = offersData.hidden;
            offerDto.user = offersData.user;
            if (offersData.user) {
                const { password, ...userDetails } = offersData.user;
                offerDto.user = {
                    ...userDetails,
                };
            }
            else {
                offerDto.user = null;
            }
            return offerDto;
        }
        else {
            return new offer_dto_1.OfferDto();
        }
    }
    async canCreateOffer(id, createOfferDto) {
        const item = await this.wishRepository.findOne({
            where: { id: createOfferDto.itemId },
            relations: ['owner'],
        });
        if (item && item.owner && item.owner.id === id) {
            throw new common_1.ForbiddenException('Вы не можете платить за собственный подарок');
        }
        if (item && createOfferDto.amount && item.raised == item.price) {
            throw new common_1.ForbiddenException('Деньги на подарок уже собраны');
        }
        if (item &&
            createOfferDto.amount &&
            Number(item.raised) + createOfferDto.amount > item.price) {
            throw new common_1.ForbiddenException('Оплата превысет сумму подарка');
        }
    }
};
exports.OfferService = OfferService;
exports.OfferService = OfferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OfferService);
//# sourceMappingURL=offer.service.js.map