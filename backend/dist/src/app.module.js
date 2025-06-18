"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const wish_entity_1 = require("./entity/wish.entity");
const offer_entity_1 = require("./entity/offer.entity");
const wishlist_entity_1 = require("./entity/wishlist.entity");
const wish_module_1 = require("./wish/wish.module");
const users_module_1 = require("./users/users.module");
const offer_module_1 = require("./offer/offer.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            wish_module_1.WishModule,
            users_module_1.UserModule,
            offer_module_1.OfferModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'student',
                password: 'student',
                database: 'kupipodariday',
                entities: [user_entity_1.User, wish_entity_1.Wish, offer_entity_1.Offer, wishlist_entity_1.Wishlist],
                synchronize: true,
            }),
            wishlist_module_1.WishlistModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map