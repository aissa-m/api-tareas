import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secreto123', // ⚠️ Debes usar una variable de entorno en producción
    });
  }

  async validate(payload: any) {
    // Aquí defines qué datos estarán disponibles en `req.user`
    return { id: payload.id, email: payload.email };
  }
}
