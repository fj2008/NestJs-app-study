import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //해더에 토큰을 베어러방식으로인증
    });
  }
  async validate(payload) {
    const { username } = payload; // 페이로드안에 있는
    const user: User = await this.userRepository.findOne({ username }); //유저정보체크
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
