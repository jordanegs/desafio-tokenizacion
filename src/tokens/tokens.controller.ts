import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { TokensService } from './tokens.service';
import { PkGuard } from './guards/pk.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @UseGuards(PkGuard)
  @Post()
  async createToken(@Body() createCardDto: CreateCardDto) {
    return this.tokensService.createToken(createCardDto);
  }

  @UseGuards(PkGuard, JwtGuard)
  @Post(':token')
  async getData(@Param('token') token: string) {
    return this.tokensService.getData(token);
  }
}
