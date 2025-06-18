"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensitiveDataWishInterceptor = exports.SensitiveDataUsersInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let SensitiveDataUsersInterceptor = class SensitiveDataUsersInterceptor {
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        if ((request.url === '/users/me' && request.method === 'GET') ||
            (request.method === 'PATCH' && request.url === '/users/me')) {
            return next.handle();
        }
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (data && typeof data === 'object' && 'password' in data) {
                const { password, email, ...rest } = data;
                return rest;
            }
            return data;
        }));
    }
};
exports.SensitiveDataUsersInterceptor = SensitiveDataUsersInterceptor;
exports.SensitiveDataUsersInterceptor = SensitiveDataUsersInterceptor = __decorate([
    (0, common_1.Injectable)()
], SensitiveDataUsersInterceptor);
let SensitiveDataWishInterceptor = class SensitiveDataWishInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => this.removeSensitiveData(data)));
    }
    removeSensitiveData(data) {
        if (Array.isArray(data)) {
            return data.map((item) => this.removeSensitiveData(item));
        }
        else if (data && typeof data === 'object') {
            const { password, email, ...rest } = data;
            if (rest.owner) {
                rest.owner = this.removeSensitiveData(rest.owner);
            }
            if (Array.isArray(rest.offers)) {
                rest.offers = rest.offers.map((offer) => {
                    if (offer.user) {
                        if (Array.isArray(offer.user.wishlists)) {
                            offer.user.wishlists = offer.user.wishlists.map((wishlist) => {
                                if (wishlist.owner) {
                                    wishlist.owner = this.removeSensitiveData(wishlist.owner);
                                }
                                return wishlist;
                            });
                        }
                    }
                    if (offer.user) {
                        offer.user = this.removeSensitiveData(offer.user);
                    }
                    return offer;
                });
            }
            return rest;
        }
        return data;
    }
};
exports.SensitiveDataWishInterceptor = SensitiveDataWishInterceptor;
exports.SensitiveDataWishInterceptor = SensitiveDataWishInterceptor = __decorate([
    (0, common_1.Injectable)()
], SensitiveDataWishInterceptor);
//# sourceMappingURL=sensitive-data.interceptors.js.map