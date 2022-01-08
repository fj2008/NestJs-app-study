import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authcredentilDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authcredentilDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      //유저토큰 생성(Secret + Paylozd)
      const payload = { username }; //패이로드에 중요한 정보는 넣으면 안된다.
      const accessToken = await this.jwtService.sign(payload); //여기서 알아서 payload를합쳐서 만들어준다.
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
