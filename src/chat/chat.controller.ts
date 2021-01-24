import { Param, UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt';
import { ChatService } from './chat.service';

@Controller('chat')
@ApiTags('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('/rooms')
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.chatService.findAll()
    }

    @Post('/join/:room_id')
    @UseGuards(JwtAuthGuard)
    async join(@Request() req, @Param('room_id') room_id: number) {
        return this.chatService.join(room_id, req.user);
    }

}
