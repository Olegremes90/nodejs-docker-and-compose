import { User } from './user.entity';
import { Wishlist } from './wishlist.entity';
export declare class Wish {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    copied: number;
    owner: User;
    description: string;
    wishlists: Wishlist[];
}
