import { UserDto } from './users.dto';
import { WishlistDto } from './wishlist.dto';
export declare class OfferDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    item: string | null;
    amount: number;
    hidden: boolean;
    user?: UserDto | null;
    wishes?: string[];
    offers?: string[];
    wishlists?: WishlistDto[];
}
export declare class CreateOfferDto {
    hidden?: boolean;
    amount: number;
    itemId: number;
}
