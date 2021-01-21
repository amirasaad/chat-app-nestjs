import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SignupDto } from './dto/signup.dto';

@Controller('users')
export class UsersController {
  @Post('/')
  signup(@Body() signupDto: SignupDto) {
    return { email: signupDto.email };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
