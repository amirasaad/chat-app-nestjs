import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RoomSchema } from './schemas/room';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
    UsersModule
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [
    ChatService,
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
  ],
})
export class ChatModule {}
