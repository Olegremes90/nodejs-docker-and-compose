import { User } from './user.entity';
import { Wish } from './wish.entity';
export declare class Offer {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    wish: Wish;
    amount: number;
    hidden: boolean;
}
