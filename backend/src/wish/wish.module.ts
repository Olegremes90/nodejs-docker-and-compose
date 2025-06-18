import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from '../entity/wish.entity';
import { User } from '../entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Wish, User])],
  providers: [WishService],
  controllers: [WishController],
})
export class WishModule {}
