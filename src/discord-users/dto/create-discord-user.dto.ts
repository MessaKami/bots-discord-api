import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscordUserDto {
  @ApiProperty({
    description: 'ID Discord de l\'utilisateur',
    example: '123456789012345678'
  })
  @IsString()
  @Length(17, 19)
  uuidDiscord: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur Discord',
    example: 'JohnDoe#1234'
  })
  @IsString()
  @Length(2, 50)
  discordUsername: string;

  @ApiProperty({
    description: 'Discriminateur Discord',
    example: '1234'
  })
  @IsString()
  @Length(1, 50)
  discriminator: string;
} 