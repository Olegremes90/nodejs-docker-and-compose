import { Wish } from '../entity/wish.entity';
import { WishService } from './wish.service';
import { WishDto, CreateWishDto, ItemWishDto } from '../dto/wish.dto';
export declare class WishController {
    private wishService;
    constructor(wishService: WishService);
    getWishesByUserId(req: any): Promise<WishDto[] | null>;
    getWishesByUsername(username: string): Promise<WishDto[] | null>;
    findMany(createWishDto: CreateWishDto): Promise<Wish>;
    getWishLast(): Promise<WishDto[] | null>;
    getWishTop(): Promise<WishDto[] | null>;
    getWishesById(id: number): Promise<WishDto | null>;
    updateWish(id: number, req: any, createWishDto: CreateWishDto): Promise<WishDto>;
    remove(req: any, id: number): Promise<WishDto>;
    copyWish(req: any, id: number): Promise<ItemWishDto>;
}
