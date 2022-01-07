import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 들어갈 수 있도록 벨리데이션체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '패스워드는 숫자와 영어만 사용하실 수 있습니다.',
  })
  password: string;
}
