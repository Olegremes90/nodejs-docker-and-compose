import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Wish } from './entity/wish.entity';
import { Offer } from './entity/offer.entity';
import { Wishlist } from './entity/wishlist.entity';
import { WishModule } from './wish/wish.module';
import { UserModule } from './users/users.module';
import { OfferModule } from './offer/offer.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
@Module({
  imports: [
    WishModule,
    UserModule,
    OfferModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Wish, Offer, Wishlist],
      synchronize: true,
    }),
    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
