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
exports.CreateOfferDto = exports.OfferDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const users_dto_1 = require("./users.dto");
const wishlist_dto_1 = require("./wishlist.dto");
class OfferDto {
    id;
    createdAt;
    updatedAt;
    item;
    amount;
    hidden;
    user;
    wishes;
    offers;
    wishlists;
}
exports.OfferDto = OfferDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Уникальный идентификатор предложения',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OfferDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: 'Дата создания',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], OfferDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: 'Дата последнего обновления',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], OfferDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Пожелание, на которое сделано предложение',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], OfferDto.prototype, "item", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Сумма предложения' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OfferDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'Статус видимости предложения' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OfferDto.prototype, "hidden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => users_dto_1.UserDto,
        description: 'Пользователь, сделавший предложение',
    }),
    (0, class_transformer_1.Type)(() => users_dto_1.UserDto),
    __metadata("design:type", Object)
], OfferDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], OfferDto.prototype, "wishes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], OfferDto.prototype, "offers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => wishlist_dto_1.WishlistDto,
        description: 'Пользователь, сделавший предложение',
    }),
    (0, class_transformer_1.Type)(() => wishlist_dto_1.WishlistDto),
    __metadata("design:type", Array)
], OfferDto.prototype, "wishlists", void 0);
class CreateOfferDto {
    hidden;
    amount;
    itemId;
}
exports.CreateOfferDto = CreateOfferDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'Статус видимости предложения' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOfferDto.prototype, "hidden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Сумма предложения' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'Ссылка на продукт' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "itemId", void 0);
//# sourceMappingURL=offer.dto.js.map