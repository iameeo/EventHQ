
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable() // 의존성 주입 가능한 서비스
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() { // 생성자 - 의존성 주입
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) { // 비동기 함수
    console.log('[JWT payload]', payload);
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}