import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() login: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
