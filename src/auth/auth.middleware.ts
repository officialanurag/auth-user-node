import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: any, next: () => void) {
    if (['/login', '/signup'].includes(req.url)) {
      next();
    } else {
      if (!(req.headers && req.headers['authorization'])) {
        res.status(HttpStatus.UNAUTHORIZED).send({
          status: 401,
          message: 'Token is required!'
        })
      } else {
        const user = this.jwtService.verify(req.headers['authorization'], { secret: 'hard!to-guess_secret' });
        req['user'] = user;
        next();
      }
    }
  }
}
