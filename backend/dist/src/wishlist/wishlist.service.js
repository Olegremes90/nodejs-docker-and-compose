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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("../entity/wishlist.entity");
const wishlist_dto_1 = require("../dto/wishlist.dto");
const user_entity_1 = require("../entity/user.entity");
const wish_entity_1 = require("../entity/wish.entity");
let WishlistService = class WishlistService {
    wishlistRepository;
    wishRepository;
    constructor(wishlistRepository, wishRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishRepository = wishRepository;
    }
    async getAllWishlists() {
        const wishlistsData = await this.wishlistRepository
            .createQueryBuilder('wishlist')
            .leftJoinAndMapOne('wishlist.owner', user_entity_1.User, 'wishlistUser', 'wishlistUser.id= wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = wishlist.id')
            .leftJoinAndMapMany('wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
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
            const wishlistsDto = new wishlist_dto_1.WishlistDto();
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
    async getWishlistById(id) {
        const wishlistsData = await this.wishlistRepository
            .createQueryBuilder('wishlist')
            .leftJoinAndMapOne('wishlist.owner', user_entity_1.User, 'wishlistUser', 'wishlistUser.id= wishlist.authorId')
            .leftJoin('wish_wishlists_wishlist', 'ww', 'ww.wishlistId = wishlist.id')
            .leftJoinAndMapMany('wishlist.items', wish_entity_1.Wish, 'wishItems', 'wishItems.id = ww.wishId')
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
            throw new common_1.NotFoundException('No wishlist');
        }
        const wishlistsDto = new wishlist_dto_1.WishlistDto();
        wishlistsDto.id = wishlistsData.id;
        wishlistsDto.createdAt = wishlistsData.createdAt;
        wishlistsDto.updatedAt = wishlistsData.updatedAt;
        wishlistsDto.name = wishlistsData.name;
        wishlistsDto.image = wishlistsData.image;
        wishlistsDto.owner = wishlistsData.author ?? null;
        wishlistsDto.items = wishlistsData.wishes ?? null;
        return wishlistsDto;
    }
    async createWishlist(createWishlistDto) {
        const items = await this.wishRepository.findBy({
            id: (0, typeorm_2.In)(createWishlistDto.itemsId),
        });
        console.log(items);
        if (items.length !== createWishlistDto.itemsId.length) {
            throw new common_1.NotFoundException(`Некоторые пожелания не найдены`);
        }
        const newWishlist = this.wishlistRepository.create({
            image: createWishlistDto.image,
            name: createWishlistDto.name,
        });
        const savedWishlist = await this.wishlistRepository.save(newWishlist);
        await this.wishlistRepository
            .createQueryBuilder()
            .relation(wishlist_entity_1.Wishlist, 'wishes')
            .of(savedWishlist)
            .add(items);
        return this.getWishlistById(savedWishlist.id);
    }
    async updateWishlist(id, createWishlistDto) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id },
            relations: ['wishes'],
        });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Wishlist with id ${id} not found`);
        }
        const items = await this.wishRepository.findBy({
            id: (0, typeorm_2.In)(createWishlistDto.itemsId),
        });
        console.log(items);
        debugger;
        if (items.length !== createWishlistDto.itemsId.length) {
            throw new common_1.NotFoundException(`Некоторые пожелания не найдены`);
        }
        wishlist.name = createWishlistDto.name;
        wishlist.image = createWishlistDto.image;
        wishlist.wishes = items;
        await this.wishlistRepository.save(wishlist);
        return this.getWishlistById(id);
    }
    async removeWishlistById(id) {
        const wishlist = await this.wishlistRepository.findOne({ where: { id } });
        if (!wishlist) {
            throw new common_1.NotFoundException(`Wishlist with id ${id} not found`);
        }
        const deleted = this.getWishlistById(id);
        await this.wishlistRepository.remove(wishlist);
        return deleted;
    }
    async checkAccessUpdateOrDeleteResource(id, userId) {
        const wishlist = await this.getWishlistById(id);
        if (!wishlist) {
            throw new common_1.NotFoundException(`Wishlist with id ${id} not found`);
        }
        if (!wishlist.owner || wishlist.owner.id != userId) {
            throw new common_1.ForbiddenException('У вас нет прав для доступа к этому ресурсу');
        }
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map