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
exports.WishController = void 0;
const wish_service_1 = require("./wish.service");
const common_1 = require("@nestjs/common");
const wish_dto_1 = require("../dto/wish.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const sensitive_data_interceptors_1 = require("../interceptors/sensitive-data.interceptors");
let WishController = class WishController {
    wishService;
    constructor(wishService) {
        this.wishService = wishService;
    }
    async getWishesByUserId(req) {
        return this.wishService.getUserWishes(req.user.username);
    }
    async getWishesByUsername(username) {
        return this.wishService.getUserWishes(username);
    }
    async findMany(createWishDto) {
        return this.wishService.create(createWishDto);
    }
    async getWishLast() {
        return this.wishService.getLastWish('DESC');
    }
    async getWishTop() {
        return this.wishService.getTopWish();
    }
    async getWishesById(id) {
        return this.wishService.getWishById(id);
    }
    async updateWish(id, req, createWishDto) {
        await this.wishService.checkAccessUpdateOrDeleteResource(id, req.user.id);
        await this.wishService.canUpdatePrice(id, createWishDto);
        return this.wishService.updateWish(id, createWishDto);
    }
    async remove(req, id) {
        await this.wishService.checkAccessUpdateOrDeleteResource(id, req.user.id);
        await this.wishService.canDelete(id);
        return this.wishService.remove(id);
    }
    async copyWish(req, id) {
        return this.wishService.copy(req.user.id, id);
    }
};
exports.WishController = WishController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('users/me/wishes'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "getWishesByUserId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('users/:username/wishes'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "getWishesByUsername", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('wishes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wish_dto_1.CreateWishDto]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)('wishes/last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WishController.prototype, "getWishLast", null);
__decorate([
    (0, common_1.Get)('wishes/top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WishController.prototype, "getWishTop", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('wishes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "getWishesById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('wishes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, wish_dto_1.CreateWishDto]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "updateWish", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('wishes/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('wishes/:id/copy'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], WishController.prototype, "copyWish", null);
exports.WishController = WishController = __decorate([
    (0, common_1.UseInterceptors)(sensitive_data_interceptors_1.SensitiveDataWishInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [wish_service_1.WishService])
], WishController);
//# sourceMappingURL=wish.controller.js.map