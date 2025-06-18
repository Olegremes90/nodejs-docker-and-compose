import { UserDto } from './users.dto';
import { OfferDto } from './offer.dto';
export declare class ItemWishDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    description: string;
}
export declare class WishDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    description: string;
    owner: UserDto;
    offers?: OfferDto[];
}
export declare class CreateWishDto {
    name: string;
    link: string;
    image: string;
    price: number;
    description: string;
}
export declare class UpdateWishDto {
    amount: number;
    hidden?: boolean;
    itemId: number;
}
