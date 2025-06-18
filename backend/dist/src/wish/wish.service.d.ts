import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Wish } from '../entity/wish.entity';
import { WishDto, CreateWishDto, ItemWishDto } from '../dto/wish.dto';
export declare class WishService {
    private wishRepository;
    private usersRepository;
    constructor(wishRepository: Repository<Wish>, usersRepository: Repository<User>);
    getUserWishes(username: string): Promise<WishDto[]>;
    create(createWishDto: CreateWishDto): Promise<Wish>;
    getTopWish(): Promise<WishDto[]>;
    getLastWish(orderby: string): Promise<WishDto[]>;
    getWishById(id: number): Promise<WishDto>;
    updateWish(id: number, createWishDto: CreateWishDto): Promise<WishDto>;
    remove(id: number): Promise<WishDto>;
    copy(userId: number, id: number): Promise<ItemWishDto>;
    checkAccessUpdateOrDeleteResource(id: number, userId: number): Promise<void>;
    canUpdatePrice(id: number, createWishDto: CreateWishDto): Promise<void>;
    canDelete(id: number): Promise<void>;
}
