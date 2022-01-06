//클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 사용할때 유리하다
//그래서 dto만들때 클래슬 만듬

import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
