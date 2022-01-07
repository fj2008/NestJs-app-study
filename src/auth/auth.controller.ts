import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authcredentilDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authcredentilDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authcredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authcredentialDto);
  }
}