import { Wish } from './wish.entity';
import { User } from './user.entity';
export declare class Wishlist {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string | null;
    image: string;
    wishes: Wish[];
    author: User;
}
