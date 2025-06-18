import { WishlistService } from './wishlist.service';
import { CreateWishlistDto, WishlistDto } from '../dto/wishlist.dto';
export declare class WishlistController {
    private wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(): Promise<WishlistDto[]>;
    getWishesById(req: any, id: number): Promise<WishlistDto | null>;
    createWishlist(creatWishlistDto: CreateWishlistDto): Promise<WishlistDto | null>;
    updateWishlist(req: any, id: number, creatWishlistDto: CreateWishlistDto): Promise<WishlistDto | null>;
    deleteWishlist(req: any, id: number): Promise<WishlistDto | null>;
}
