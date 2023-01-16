import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { TokenDocument } from './schemas/token.schema';
import { ICreateCard } from './interfaces/create-card.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { ICard } from './interfaces/card.interface';

describe('TokensController', () => {
  let tokensController: TokensController;
  let tokensService: TokensService;
  let tokenModel: Model<TokenDocument>;
  let jwtService: JwtService;

  beforeEach(() => {
    tokensService = new TokensService(tokenModel, jwtService);
    tokensController = new TokensController(tokensService);
  });

  const body: CreateCardDto = {
    email: 'jordan@gmail.com',
    card_number: 4213550112527360,
    cvv: 1000,
    expiration_month: '09',
    expiration_year: '2027',
  };

  describe('Crear Token', () => {
    it('Creación Exitosa', async () => {
      const result: ICreateCard = {
        email: 'jordan@gmail.com',
        card_number: 4213550112527360,
        expiration_month: '09',
        expiration_year: '2027',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM4MDU1NjYsImV4cCI6MTY3MzgwNTYyNn0.4Hw9yDXI8ILJnnRhPJ7BgEbb-0MxMbcefYTauyZ1zZM',
      };
      jest
        .spyOn(tokensService, 'createToken')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tokensController.createToken(body)).toBe(result);
    });
    it('Error: No se pudo crear Token', async () => {
      const message = 'No se pudo crear Token';
      jest.spyOn(tokensService, 'createToken').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensController.createToken(body)).rejects.toThrowError(
        message,
      );
    });
  });

  describe('Traer datos de tarjeta', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM4MTIxNzUsImV4cCI6MTY3MzgxMjIzNX0.vm236I9eefGJE1UDs4UrgXkEZtcPHytesRiwp5HtK1w';
    it('Creación Exitosa', async () => {
      const result: ICard = {
        card_number: 4213550112527360,
        expiration_month: '09',
        expiration_year: '2027',
      };
      jest
        .spyOn(tokensService, 'getData')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tokensController.getData(token)).toBe(result);
    });
    it('Error: No se traer datos', async () => {
      const message = 'No se pudo obtener datos de la DB.';
      jest.spyOn(tokensService, 'getData').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensController.getData(token)).rejects.toThrowError(
        message,
      );
    });
  });
});
