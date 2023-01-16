import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokensService } from '../tokens.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.params.token;
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      await this.tokensService.deleteToken(token);
      throw new UnauthorizedException('El token de la tarjeta expiró');
    }
  }
}
