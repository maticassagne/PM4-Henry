import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  signUp(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }
}
