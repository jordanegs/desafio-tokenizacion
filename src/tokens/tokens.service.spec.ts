import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { TokensService } from './tokens.service';
import { Token, TokenDocument } from './schemas/token.schema';
import { ICreateCard } from './interfaces/create-card.interface';
import { CreateCardDto } from './dto/create-card.dto';
import { ICard } from './interfaces/card.interface';

describe('TokensService', () => {
  let tokensService: TokensService;
  let tokenModel: Model<TokenDocument>;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensService,
        JwtService,
        {
          provide: getModelToken(Token.name),
          useValue: Model,
        },
      ],
    }).compile();
    tokenModel = module.get<Model<TokenDocument>>(getModelToken(Token.name));
    tokensService = module.get<TokensService>(TokensService);
    jwtService = module.get<JwtService>(JwtService);
  });

  const body: CreateCardDto = {
    email: 'jordan@gmail.com',
    card_number: 4213550112527360,
    cvv: 1000,
    expiration_month: '09',
    expiration_year: '2027',
  };

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM4MDU1NjYsImV4cCI6MTY3MzgwNTYyNn0.4Hw9yDXI8ILJnnRhPJ7BgEbb-0MxMbcefYTauyZ1zZM';

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
      jest.spyOn(jwtService, 'sign').mockImplementation(() => result.token);
      jest
        .spyOn(tokenModel, 'create')
        .mockImplementation(() => Promise.resolve(null));

      expect(await tokensService.createToken(body)).toStrictEqual(result);
    });

    it('Error: No se pudo crear Token', async () => {
      const result: ICreateCard = {
        email: 'jordan@gmail.com',
        card_number: 4213550112527360,
        expiration_month: '09',
        expiration_year: '2027',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM4MDU1NjYsImV4cCI6MTY3MzgwNTYyNn0.4Hw9yDXI8ILJnnRhPJ7BgEbb-0MxMbcefYTauyZ1zZM',
      };
      const message = 'No se pudo crear Token';
      jest.spyOn(jwtService, 'sign').mockImplementation(() => result.token);
      jest.spyOn(tokenModel, 'create').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensService.createToken(body)).rejects.toThrowError(
        message,
      );
    });
  });

  describe('Traer datos de tarjeta', () => {
    it('Creación Exitosa', async () => {
      const result: ICard = {
        card_number: 4213550112527360,
        expiration_month: '09',
        expiration_year: '2027',
      };
      jest.spyOn(tokenModel, 'findOne').mockResolvedValue(result);

      expect(await tokensService.getData(token)).toStrictEqual(result);
    });

    it('Error: no existe datos', async () => {
      jest.spyOn(tokenModel, 'findOne').mockResolvedValue(null);

      await expect(tokensService.getData(token)).rejects.toThrowError(
        'No se encontraron los datos de la tarjeta.',
      );
    });

    it('Creación Exitosa', async () => {
      const message = 'No se pudo obtener datos de la DB.';
      jest.spyOn(tokenModel, 'findOne').mockImplementation(() => {
        throw new BadRequestException(message);
      });

      await expect(tokensService.getData(token)).rejects.toThrowError(message);
    });
  });

  describe('Eliminar Token', () => {
    it('Eliminacion Exitosa', async () => {
      jest.spyOn(tokenModel, 'deleteOne').mockResolvedValue(null);

      expect(await tokensService.deleteToken(token)).toBeDefined();
    });
  });
});
