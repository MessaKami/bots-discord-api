import { IsString, IsInt, IsEnum, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum ChannelType {
  TEXT = 'text',
  VOICE = 'voice',
  ANNOUNCEMENT = 'announcement'
}

export class CreateChannelDto {
  @ApiProperty({
    description: 'Le nom du channel',
    example: 'général',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Le type de channel',
    example: 'text',
    enum: ChannelType
  })
  @IsString()
  @IsEnum(ChannelType)
  type: string;

  @ApiProperty({
    description: 'La position du channel',
    example: 1,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  channelPosition: number;

  @ApiProperty({
    description: 'UUID de la catégorie associée',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsString()
  categoryId?: string;
} 