import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
}
