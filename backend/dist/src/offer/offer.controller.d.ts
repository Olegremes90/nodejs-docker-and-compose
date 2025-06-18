import { OfferService } from '../offer/offer.service';
import { CreateOfferDto, OfferDto } from '../dto/offer.dto';
export declare class OfferController {
    private readonly offerService;
    constructor(offerService: OfferService);
    createOffer(req: any, createOfferDto: CreateOfferDto): Promise<OfferDto>;
    getAllOffers(): Promise<OfferDto[]>;
    getOfferById(id: number): Promise<OfferDto>;
}
