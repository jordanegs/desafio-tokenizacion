import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Token, TokenDocument } from './schemas/token.schema';
import { CreateCardDto } from './dto/create-card.dto';
import { ICreateCard } from './interfaces/create-card.interface';
import { ICard } from './interfaces/card.interface';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private jwtService: JwtService,
  ) {}

  async createToken(createCardDto: CreateCardDto): Promise<ICreateCard> {
    try {
      const token = this.jwtService.sign({});
      const data = { ...createCardDto, token: token };
      await this.tokenModel.create(data);
      delete data.cvv;
      return data;
    } catch (e) {
      throw new BadRequestException(
        e.message ? e.message : 'No se pudo crear Token.',
      );
    }
  }

  async getData(token: string): Promise<ICard> {
    try {
      const data = await this.tokenModel.findOne<ICard>(
        { token },
        { _id: 0, cvv: 0, token: 0, __v: 0, email: 0 },
      );
      if (!data) {
        throw new NotFoundException(
          'No se encontraron los datos de la tarjeta.',
        );
      }
      return data;
    } catch (e) {
      throw new BadRequestException(
        e.message ? e.message : 'No se pudo obtener datos de la DB.',
      );
    }
  }

  deleteToken(token: string) {
    return this.tokenModel.deleteOne({ token });
  }
}
