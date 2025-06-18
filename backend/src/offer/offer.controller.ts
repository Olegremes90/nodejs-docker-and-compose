import {} from '../entity/user.entity';
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { OfferService } from '../offer/offer.service';
import { CreateOfferDto, OfferDto } from '../dto/offer.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOffer(
    @Request() req,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<OfferDto> {
    await this.offerService.canCreateOffer(req.user.id, createOfferDto);
    return this.offerService.createOffer(req.user.id, createOfferDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOffers(): Promise<OfferDto[]> {
    return this.offerService.getAllOffers();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOfferById(@Param('id') id: number): Promise<OfferDto> {
    return this.offerService.getOfferById(id);
  }
}
