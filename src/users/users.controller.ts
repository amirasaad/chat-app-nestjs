import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/')
  async list() {
    return await this.usersService.findAll();
    }

  @Post('/')
  async signup(@Response() res, @Body() signupDto: SignupDto) {
    const result = await this.usersService.create(signupDto);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
