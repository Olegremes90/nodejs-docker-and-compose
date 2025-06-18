import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from '../entity/offer.entity';
import { Wish } from '../entity/wish.entity';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish, User])],
  providers: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
