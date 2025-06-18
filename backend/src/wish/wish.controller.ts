import { Wish } from '../entity/wish.entity';
import { WishService } from './wish.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { WishDto, CreateWishDto, ItemWishDto } from '../dto/wish.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SensitiveDataWishInterceptor } from '../interceptors/sensitive-data.interceptors';

@UseInterceptors(SensitiveDataWishInterceptor)
@Controller()
export class WishController {
  constructor(private wishService: WishService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users/me/wishes')
  async getWishesByUserId(@Request() req): Promise<WishDto[] | null> {
    // todo вычисляем username авторзованного юзера и передаем
    return this.wishService.getUserWishes(req.user.username);
  }
  @UseGuards(JwtAuthGuard)
  @Get('users/:username/wishes')
  async getWishesByUsername(
    @Param('username') username: string,
  ): Promise<WishDto[] | null> {
    return this.wishService.getUserWishes(username);
  }
  @UseGuards(JwtAuthGuard)
  @Post('wishes')
  async findMany(@Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishService.create(createWishDto);
  }

  @Get('wishes/last')
  async getWishLast(): Promise<WishDto[] | null> {
    return this.wishService.getLastWish('DESC');
  }

  @Get('wishes/top')
  async getWishTop(): Promise<WishDto[] | null> {
    return this.wishService.getTopWish();
  }
  @UseGuards(JwtAuthGuard)
  @Get('wishes/:id')
  async getWishesById(@Param('id') id: number): Promise<WishDto | null> {
    return this.wishService.getWishById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('wishes/:id')
  async updateWish(
    @Param('id') id: number,
    @Request() req,
    @Body() createWishDto: CreateWishDto,
  ): Promise<WishDto> {
    await this.wishService.checkAccessUpdateOrDeleteResource(id, req.user.id);
    await this.wishService.canUpdatePrice(id, createWishDto);
    return this.wishService.updateWish(id, createWishDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('wishes/:id')
  async remove(@Request() req, @Param('id') id: number): Promise<WishDto> {
    await this.wishService.checkAccessUpdateOrDeleteResource(id, req.user.id);
    await this.wishService.canDelete(id);
    return this.wishService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('wishes/:id/copy')
  async copyWish(
    @Request() req,
    @Param('id') id: number,
  ): Promise<ItemWishDto> {
    return this.wishService.copy(req.user.id, id);
  }
}
