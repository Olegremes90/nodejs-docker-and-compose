import { UserDto } from './users.dto';
import { ItemWishDto } from './wish.dto';
export declare class WishlistDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    image?: string;
    owner: UserDto | null;
    items?: ItemWishDto[] | null;
}
export declare class CreateWishlistDto {
    name: string;
    image: string;
    itemsId: number[];
}
