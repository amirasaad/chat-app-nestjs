import { Param } from '@nestjs/common';
import { Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@Controller('chat')
@ApiTags('chats')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('/rooms')
    async findAll() {
        return await this.chatService.findAll()
    }

    @Post('/join/:room_id')
    async join(@Request() req, @Param('room_id') room_id: number) {
        return this.chatService.join(room_id, req.user);
    }

}
