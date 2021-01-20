import { Body, Controller, Post } from '@nestjs/common';

export class SignupDto {
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  @Post('/')
  signup(@Body() signupDto: SignupDto) {
    return { email: signupDto.email };
  }
}
