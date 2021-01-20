import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';

@Controller('users')
export class UsersController {
  @Post('/')
  signup(@Body() signupDto: SignupDto) {
    return { email: signupDto.email };
  }
}
