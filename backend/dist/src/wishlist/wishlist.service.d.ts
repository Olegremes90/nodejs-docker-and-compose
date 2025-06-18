import { Repository } from 'typeorm';
import { Wishlist } from '../entity/wishlist.entity';
import { WishlistDto } from '../dto/wishlist.dto';
import { Wish } from '../entity/wish.entity';
import { CreateWishlistDto } from '../dto/wishlist.dto';
export declare class WishlistService {
    private readonly wishlistRepository;
    private readonly wishRepository;
    constructor(wishlistRepository: Repository<Wishlist>, wishRepository: Repository<Wish>);
    getAllWishlists(): Promise<WishlistDto[]>;
    getWishlistById(id: number): Promise<WishlistDto>;
    createWishlist(createWishlistDto: CreateWishlistDto): Promise<WishlistDto>;
    updateWishlist(id: number, createWishlistDto: CreateWishlistDto): Promise<WishlistDto>;
    removeWishlistById(id: number): Promise<WishlistDto>;
    checkAccessUpdateOrDeleteResource(id: number, userId: number): Promise<void>;
}
