import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SensitiveDataUsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    if (
      (request.url === '/users/me' && request.method === 'GET') ||
      (request.method === 'PATCH' && request.url === '/users/me')
    ) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'password' in data) {
          const { password, email, ...rest } = data;
          return rest;
        }
        return data;
      }),
    );
  }
}

@Injectable()
export class SensitiveDataWishInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.removeSensitiveData(data)));
  }

  private removeSensitiveData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.removeSensitiveData(item));
    } else if (data && typeof data === 'object') {
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
}
