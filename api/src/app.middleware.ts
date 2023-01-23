import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users/users.service';
import { ConfigService } from '@nestjs/config';

// authentication middleware
@Injectable()
export class isAuthenticated implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService,
    private readonly ConfigService: ConfigService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        // checks if JWT present in request headers
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        // extracts it and checks it validity
        const token = req.headers.authorization.split(' ')[1];
        const payload = await this.jwt.verify(token, {
          secret: this.ConfigService.get<string>('SECRET'),
        });
        // uses the email information within the token to calling the findOne users' service and checks if the user exists
        const user = await this.userService.findOne(payload.email);
        if (user) {
          // if they exist, forwards their information to the next middleware/function in controller stack
          req.user = user;
          next();
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('No token found', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
