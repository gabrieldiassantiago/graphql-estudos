import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log("cookies disponiveis:", req?.cookies);  
          return req?.cookies?.token || null;
        },
      ]),
      secretOrKey: 'supersecret',
    });
  }

  async validate(payload: any) {
    console.log("payload validado:", payload); 
    return { sub: payload.sub, email: payload.email };
  }
}
