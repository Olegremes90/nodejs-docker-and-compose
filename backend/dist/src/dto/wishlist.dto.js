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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWishlistDto = exports.WishlistDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const users_dto_1 = require("./users.dto");
const class_transformer_1 = require("class-transformer");
const wish_dto_1 = require("./wish.dto");
class WishlistDto {
    id;
    createdAt;
    updatedAt;
    name;
    image;
    owner;
    items;
}
exports.WishlistDto = WishlistDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Unique identifier of the wishlist' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WishlistDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-05-15T17:26:13.161Z',
        description: 'Creation date',
        format: 'date-time',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WishlistDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-05-15T17:26:13.161Z',
        description: 'Last update date',
        format: 'date-time',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WishlistDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string', description: 'Name of the wishlist' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WishlistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string', description: 'Image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WishlistDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => users_dto_1.UserDto,
        description: 'Пожелание, на которое сделано предложение',
    }),
    (0, class_transformer_1.Type)(() => users_dto_1.UserDto),
    __metadata("design:type", Object)
], WishlistDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => wish_dto_1.ItemWishDto,
        description: 'Пожелание, на которое сделано предложение',
    }),
    (0, class_transformer_1.Type)(() => wish_dto_1.ItemWishDto),
    __metadata("design:type", Object)
], WishlistDto.prototype, "items", void 0);
class CreateWishlistDto {
    name;
    image;
    itemsId;
}
exports.CreateWishlistDto = CreateWishlistDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string', description: 'Name of the wishlist' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWishlistDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'string', description: 'Image URL', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWishlistDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Unique identifiers of the wishes' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Array)
], CreateWishlistDto.prototype, "itemsId", void 0);
//# sourceMappingURL=wishlist.dto.js.map