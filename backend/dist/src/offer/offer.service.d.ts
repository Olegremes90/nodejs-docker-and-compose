import { Offer } from '../entity/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto, OfferDto } from '../dto/offer.dto';
import { User } from '../entity/user.entity';
import { Wish } from '../entity/wish.entity';
export declare class OfferService {
    private offerRepository;
    private wishRepository;
    private userRepository;
    constructor(offerRepository: Repository<Offer>, wishRepository: Repository<Wish>, userRepository: Repository<User>);
    createOffer(id: number, createOfferDto: CreateOfferDto): Promise<OfferDto>;
    getAllOffers(): Promise<OfferDto[]>;
    getOfferById(id: number): Promise<OfferDto>;
    canCreateOffer(id: number, createOfferDto: CreateOfferDto): Promise<void>;
}
