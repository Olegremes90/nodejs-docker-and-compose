import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto, WishlistDto } from '../dto/wishlist.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('wishlistlists')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getWishlist(): Promise<WishlistDto[]> {
    return this.wishlistService.getAllWishlists();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getWishesById(
    @Request() req,
    @Param('id') id: number,
  ): Promise<WishlistDto | null> {
    return this.wishlistService.getWishlistById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createWishlist(
    @Body() creatWishlistDto: CreateWishlistDto,
  ): Promise<WishlistDto | null> {
    return this.wishlistService.createWishlist(creatWishlistDto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateWishlist(
    @Request() req,
    @Param('id') id: number,
    @Body() creatWishlistDto: CreateWishlistDto,
  ): Promise<WishlistDto | null> {
    await this.wishlistService.checkAccessUpdateOrDeleteResource(
      req.user.id,
      id,
    );
    return this.wishlistService.updateWishlist(id, creatWishlistDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteWishlist(
    @Request() req,
    @Param('id') id: number,
  ): Promise<WishlistDto | null> {
    await this.wishlistService.checkAccessUpdateOrDeleteResource(
      req.user.id,
      id,
    );
    return this.wishlistService.removeWishlistById(id);
  }
}
