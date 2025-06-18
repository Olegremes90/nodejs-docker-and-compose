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
exports.UpdateWishDto = exports.CreateWishDto = exports.WishDto = exports.ItemWishDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const users_dto_1 = require("./users.dto");
const offer_dto_1 = require("./offer.dto");
const swagger_1 = require("@nestjs/swagger");
class ItemWishDto {
    id;
    createdAt;
    updatedAt;
    name;
    link;
    image;
    price;
    raised;
    copied;
    description;
}
exports.ItemWishDto = ItemWishDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Уникальный идентификатор пожелания',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ItemWishDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: 'Дата создания',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ItemWishDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: 'Дата последнего обновления',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ItemWishDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Название пожелания',
        minLength: 1,
        maxLength: 250,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ItemWishDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Ссылка на пожелание',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemWishDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Изображение пожелания',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemWishDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Цена пожелания',
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ItemWishDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Собранная сумма',
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ItemWishDto.prototype, "raised", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Количество копирований',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ItemWishDto.prototype, "copied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Описание пожелания',
        minLength: 1,
        maxLength: 1024,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(1024),
    __metadata("design:type", String)
], ItemWishDto.prototype, "description", void 0);
class WishDto {
    id;
    createdAt;
    updatedAt;
    name;
    link;
    image;
    price;
    raised;
    copied;
    description;
    owner;
    offers;
}
exports.WishDto = WishDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Уникальный идентификатор пожелания',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WishDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: 'Дата создания',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WishDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        format: 'date-time',
        description: 'Дата последнего обновления',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], WishDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Название пожелания',
        minLength: 1,
        maxLength: 250,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], WishDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Ссылка на пожелание',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WishDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Изображение пожелания',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WishDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Цена пожелания',
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], WishDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Собранная сумма',
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], WishDto.prototype, "raised", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Количество копирований',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WishDto.prototype, "copied", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Описание пожелания',
        minLength: 1,
        maxLength: 1024,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(1024),
    __metadata("design:type", String)
], WishDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => users_dto_1.UserDto,
        description: 'Пожелание, на которое сделано предложение',
    }),
    (0, class_transformer_1.Type)(() => users_dto_1.UserDto),
    __metadata("design:type", users_dto_1.UserDto)
], WishDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => offer_dto_1.OfferDto,
        description: 'Пожелание, на которое сделано предложение',
    }),
    (0, class_transformer_1.Type)(() => offer_dto_1.OfferDto),
    __metadata("design:type", Array)
], WishDto.prototype, "offers", void 0);
class CreateWishDto {
    name;
    link;
    image;
    price;
    description;
}
exports.CreateWishDto = CreateWishDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateWishDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWishDto.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWishDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWishDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWishDto.prototype, "description", void 0);
class UpdateWishDto {
    amount;
    hidden;
    itemId;
}
exports.UpdateWishDto = UpdateWishDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateWishDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateWishDto.prototype, "hidden", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateWishDto.prototype, "itemId", void 0);
//# sourceMappingURL=wish.dto.js.map